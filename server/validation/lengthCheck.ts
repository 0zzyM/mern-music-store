import { BadRequestError } from "../errors/AppError.js";

export const checkLength = (
  key: string, //email , password , name etc
  val: string, //trimmed mail  etc
  min: number,
  max: number,
) => {
  if (val.length < min)
    throw new BadRequestError(`${key} needs at least ${min} characters`);
  if (val.length > max)
    throw new BadRequestError(`${key} can't exceed ${max} characters`);
};
