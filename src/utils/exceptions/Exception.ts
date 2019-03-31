export enum ErrorType {
  NotFound = "NotFound",
  Validation = "Validation"
}

export class Exception extends Error {
  constructor(errorType: ErrorType, status: number, errors: any) {
    super(errorType.toString());

    this.errorType = errorType;
    this.status = status;
    this.errors = errors;
  }

  public name: string;
  public errors: any;
  public status: number;
  public errorType: ErrorType;
}
