// Didn't  add the abstract  ghere despite adding on server
// Atm Api error is generic
// TODO: These errors can be more specific

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
