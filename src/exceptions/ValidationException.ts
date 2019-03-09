export class ValidationException extends Error {
  constructor(message: string, status: number, errors: any) {
    super(message);

    this.name = "ValidationException";
    this.status = status;
    this.errors = errors;
  }

  public name: string;
  public errors: any;
  public status: number;
}
