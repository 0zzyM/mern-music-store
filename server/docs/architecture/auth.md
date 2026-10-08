# Authentication

The auth implementation uses a combined approach of JWTs and sessions, I've aimed during implementation to combine best of both worlds.

While access tokens are short-lived(15 mins at the moment) and can be verified without a query.
Refresh tokens are linked to a session, and stored as SHA-256 hashes, also as a suggested industry standart they are rotated whenever they're used.

Which currently allows regular authenticated requests to avoid db lookups while keeping control over session expiration, refresh-token revocation, and logout.

## Implementation structure

| File                              | Responsibility                                  |
| --------------------------------- | ----------------------------------------------- |
| `authRouter.ts`                   | Registration, login, refresh, and logout routes |
| `bodyHandler.ts`                  | Request validation and normalization            |
| `authController.ts`               | HTTP responses and cookie handling              |
| `loginService.ts`                 | Credential verification and login               |
| `tokenService.ts`                 | JWT creation and validation and rotation        |
| `sessionService.ts`               | Session management and refresh-token rotation   |
| `userService.ts`                  | Retrieving the current user role                |
| `userModel.ts`, `sessionModel.ts` | MongoDB models                                  |
| `errorHandler.ts`                 | Application error handling                      |

## Sessions and tokens

Login from each device creates it's own session, which consists of:

- `userId`
- `expiresAt`
- `hashedRefreshToken`: Current refresh token hashed with SHA-256
- `createdAt` and `updatedAt`

Sessions currently expire after 30 days and refreshing a token does not extend this expiration, which is a standard of certain applications I have taken as an example up during the implementation process

A TTL index removes expired sessions automatically but realized during the process that it is asynchronous so decided to check session expiration explicitly during refresh.
Additionally `userId` was indexed to support user related queries.

### Token configuration

|             | Access token                | Refresh token                 |
| ----------- | --------------------------- | ----------------------------- |
| Algorithm   | HS256                       | HS256                         |
| Secret      | `JWT_SECRET`                | `JWT_REFRESH_SECRET`          |
| Expiration  | 15 minutes                  | Exact session expiration      |
| Claims      | `sub`, `sid`, `role`, `exp` | `sub`, `sid`, `exp`, `jti`    |
| Storage     | HTTP-only cookie            | HTTP-only cookie + hash in DB |
| Cookie path | `/`                         | `/api/v1/auth`                |

Both cookies at this point use `SameSite=Strict`, with `Secure` enabled only in production. I may consider `SameSite=lax` after weighing the pros and cons for this specific project.

- `sub` and `sid` currently allows identifing the user and session.
- Refresh tokens also include a random `jti`, to ensure that newly generated tokens are unique even when issued within the same second. This was implemented specifically after realizing that tokens are signed per min and both tokens were identicial when that happened.

Another critical point is; user's role is only included in access tokens as during refresh the current role is retrieved from MongoDB before generating a new access token.

## Authentication flow

TODO: Add the flow from draw.io when polishing is done!!

### Registration

TODO: Update this section after authorization PR is closed!

Current registration flow includes following steps:

1. Registration requests first pass through rate limiting and body validation before reaching the service.
2. Email addresses are normalized during body validation, and email and phone uniqueness are checked before the user is created.
3. If user details are unique password is hashed using bcrypt and random salt.

Additional Notes:

- New accounts always receive the default `user` role if a user with an admin role needs to be created that shall be done by an admin later on.

- As a safety Mongo duplicate-key errors are handled separately in case of two concurrent registrations passes the initial uniqueness checks. These error will throw `409 Conflict`.

- Successful registration returns only a message without exposing any user data at all, this behavior will be updated.

### Login

Login verifies the provided credentials and creates a new session when they're valid.

Current login flow includes following steps:

1. Requests go through rate limiting first, rate limits applied both on IP and email address.
2. Then credentials are passed to `bodyHandler` middleware to avoid unnecesarry lookups.
3. Then credentials are validated in the loginService using `bcrypt.compare`
4. Successful login then creates the MongoDB session.
5. Generate an access token and a refresh token.
6. Stores the refresh-token hash in the session.
7. Set both tokens as HTTP-only cookies and returns to the client.

Additional Notes:

- As a security messure, for an unknown email address, I have seen the approach and implemented a dummy bcrypt comparison to reduce timing differences between nonexistent accounts and incorrect passwords. Also both cases return the same `401` response.
- Each login also creates an independent session, so multiple devices can remain signed in and sign out independently.
- FIXME: At the moment when I'm writing this documentation I realized there is no service to end all sessions of the user so **FIX IT**.

### Token refresh and rotation

**During implementation, my research convinced me that rotation of the refresh token is a great idea in the architecture I used, so I have tried to implement it properly refering the architecture `auth0` documents explain.**

Currently the flow is:

1. Refresh endpoint validates the JWT and finds its corresponding MongoDB session.
2. Validates if the token is still valid and not expired.
3. Validates if the hashed refresh token matches the current refresh token
4. **Refresh-token rotation uses an atomic MongoDB update.** this prevents two requests using the same refresh token from both succeeding

Additional Notes:

- If concurrent refresh requests occur, only one rotates the token. The other returns `401` response, without deleting the session or invalidating the successful request's new token.
- New cookies are sent only after the database update succeeds.
- The session's original expiration remains unchanged as mentioned before.

### Logout

1. Logout first attempts to identify the session from the refresh token
2. If that fails it falls back to the access token.
3. If a valid session is identified, it is deleted.
4. Important point that logout clear both cookies regardless.

Logout is idempotent: missing tokens, invalid tokens, or an already deleted session still result in `200 OK`. Unexpected database and configuration errors are not silently ignored.

Cookie-clearing headers are set before attempting session deletion, so they are also present if a later operation fails.

If neither token can identify a session, the server cannot revoke it, but it still clears the browser cookies.

1. Attempts to validate the refresh token.
2. If the refresh token is absent or invalid, tries the access token.
3. Deletes the session when either token is valid.
4. Return `200 OK` and no matter what and clears both cookies.

Logout was designed in a way:

- A missing session is not an error.
- Missing or invalid tokens still return `200`.
- Repeated logout requests still return `200`.
- Unexpected configuration or database errors are not swallowed.

Cookies are cleared before session deletion. The client therefore receives deletion headers even when a later server operation fails.
When neither token identifies a session, the server cannot know which session to delete. It still clears the browser cookies and returns success.

## Logout flow

1. Attempts to validate the refresh token.
2. If the refresh token is absent or invalid, tries the access token.
3. Deletes the session when either token is valid.
4. Return `200 OK` and no matter what and clears both cookies.

Logout was designed in a way:

- Cookies are cleared before session deletion so client therefore receives deletion headers even if any layer fails.
- So a missing session is not an error as still needs to logout the user.
- Missing or invalid tokens still return `200`.
- Repeated logout requests still return `200`.

## Deployment Setup

Currently FE is deployed on netlify and BE is on Render.
Production should expose frontend and API through the same public origin, even if they run on separate machines behind a reverse proxy.

Under the deployment:

- Cookies are `same-origin`.
- `SameSite=Strict` is compatible.
- `Secure` is enabled on `NODE_ENV=production`.
- The backend does not require cross-origin credentialed CORS though the approach can change especially since I'm considering moving to `SameSite=lax` depending on the progress of the project. However this seems to be the safest approach at the moment.

## Error behavior

| Condition                          | Response                    |
| ---------------------------------- | --------------------------- |
| Invalid registration input         | `400 Bad Request`           |
| Duplicate email or phone           | `409 Conflict`              |
| Invalid login credentials          | `401 Unauthorized`          |
| Missing or invalid refresh token   | `401 Unauthorized`          |
| Missing, expired, or stale session | `401 Unauthorized`          |
| Invalid access or refresh JWT      | `401 Unauthorized`          |
| Missing JWT configuration          | `500 Internal Server Error` |
| Logout without valid tokens        | `200 OK`                    |

Authentication failures are kept separate from server configuration errors.

## Testing

TODO: Update after Authorization PR.

Token creation and validation are covered by unit tests.

Integration tests use **Vitest**, **Supertest**, and **mongodb-memory-server** to exercise registration, login, refresh, and logout against an isolated MongoDB instance. Integration tests were the only way to tests

These tests cover the complete HTTP flow, including middleware, controllers, services, cookies, and database state.

Rate limiting is bypassed in the integration test flow and seperate tests are to be added in the next PR.

## Security

All security measures I could remember taken during the implementation:

- Passwords are stored with bcrypt using random salt and the hashes are excluded from any user queries.
- Access and refresh tokens use separate secrets.
- JWT validation only accepts HS256.
- Refresh tokens rotate after every successful usage and stored hashed linked to a session and refresh rotations happen atomically.
- Refresh path always gets the current user role from the DB.
- Authentication tokens are inaccessible to browser JS.
- Registration cannot assign elevated roles like admin from request input.
- Rate limits protect registration and login outside the test environment.

I find SHA-256 appropriate for stored refresh-token hashes as they are high-entropy signed values.
Unlike passwords, they do not require an intentionally slow hashing algorithm like bcrypt.

## Currently pending

- Haven't implemented the protected routes yet to auth middleware.
- Authenticated identity is not yet attached to `req`.
- Role-based authorization will be implemented on the next server PR.
- Rate-limiter behavior is bypassed during normal integration tests so rate limiting tests need to be written.
