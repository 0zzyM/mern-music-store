# Authorization

The application is using RBAC type authorization system. To understand the flow you can refer to `authentication.md`.

## Roles

The app currently uses 3 roles:

- `user`: For customer accounts.
- `admin`: Admin accounts with nearly full access.
- `owner`: Full access owner account

- All new registrations receive `user` as a role and roles cannot be assigned through registration input.

- Seperate function is to be implemented for creating admin and owner accounts.

## Current Middlewares and Req Flow

1. Currently all routes requiring authorization has `validateToken` as a middleware which reads the access-token cookie and sets `req.user` after verifying access token.
2. Token's `sub` which is user id and `role` are attached to `req.user`.
3. And `validateRole` checks the authenticated role against the roles allowed by the route.
4. Request reaches to controller only after the middleware checks pass.

And userID is only then retrieved from verified token.

## Current Role Protected Routes

| Route                    | Access                 |
| ------------------------ | ---------------------- |
| `GET /api/v1/profile`    | Any authenticated user |
| `GET /api/v1/users`      | Admin or owner         |
| `GET /api/v1/users/:_id` | Admin or owner         |

Profile endpoint retrieves the user from the `req.user._id`.
FE or user can't provide their own ID, original source for this is httpOnly cookie user has.
So a separate self-access check was unnecessary or not even appopriate.

## Error handling

| Error                                     | Response           |
| ----------------------------------------- | ------------------ |
| Missing or invalid access token           | `401 Unauthorized` |
| Authenticated user with insufficient role | `403 Forbidden`    |

## Role updates

The role is stored in the short-lived access token(15 mins).
When token expires a new one will be assigned by the refresh path(FE redirection) which would contain updated role from the DB.

However an existing access token may obtain the previous role for up to its 15 mins.

TODO:
To counter this issue I'm planning verifying user's role from DB for sensitive operations.

## Tests

Authorization integration currently cover:

- All routes rejects and returns 401 when access token is missing.
- Authenticated user can access their profile details.
- All routes rejects and returns 403 when a user tries to access a protected(admin/owner) route.
- Admins can access to user details.
- Sensetive fields are excluded from the response to users(pw,role).

## Currently pending

- A path for creating admin or changing roles.
- Further implementation of protected C-U-D routes.
