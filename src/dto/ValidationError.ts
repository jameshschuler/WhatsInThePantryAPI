export class ValidationError extends Error {
  constructor(message: string, errors: any) {
    super(message);

    this.name = "ValidationError";
    this.errors = errors;
  }

  public name: string;
  public errors: any;
}
