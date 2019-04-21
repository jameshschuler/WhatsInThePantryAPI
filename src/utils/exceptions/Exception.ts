import Status from "../statusCodes";

export enum ErrorType {
  NotFound = "NotFound",
  Validation = "Validation"
}

export class Exception extends Error {
  constructor(status: Status, errors: any) {
    super(status.toString());

    this.errors = errors;
    this.status = Status[status];
    this.code = status;
  }

  public errors: any;
  public status: string;
  public code: number;
}
