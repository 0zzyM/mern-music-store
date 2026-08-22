import { BadRequestError } from "../errors/AppError.js";

const MIN_PASS_LENGTH = 8;
export const MAX_PASS_LENGTH = 72; //bcrypt limit

//TODO: Make sure FE validation will implement this correctly as a lot of copying will take plcae
export const validatePassword = (pw: string) => {
  if (pw.length < MIN_PASS_LENGTH)
    throw new BadRequestError(
      `Password can't be shorter than ${MIN_PASS_LENGTH} characters`,
    );

  // This is crucial here bcrypt only reads the first 72 bytes anything longer is ignored
  // two passwords sharing first 72bytes has completely same hashing
  // checkLength function for other validations count utf-16 units, which under countrs multi byte chars
  // go and python has errors entries over 72 bytes js doesn't
  // is it a big problem no, good to know yes!
  if (Buffer.byteLength(pw, "utf-8") > MAX_PASS_LENGTH)
    throw new BadRequestError("Password is too long");
  const missing: string[] = [];

  if (!/[a-z]/.test(pw)) missing.push("a lower case letter");
  if (!/[A-Z]/.test(pw)) missing.push("an upper case letter");
  if (!/[0-9]/.test(pw)) missing.push(`a number`);
  if (!/[^A-Za-z0-9]/.test(pw)) missing.push("a symbol");

  if (missing.length > 0)
    throw new BadRequestError(
      `Password needs to contain ${missing.join(", ")}`,
    );
};
