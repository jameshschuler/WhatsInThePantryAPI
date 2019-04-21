import Status from "../../utils/statusCodes";

export default class APIResponse {
  constructor(
    status: Status,
    messages: Array<string | undefined>,
    result: Object
  ) {
    this.status = Status[status];
    this.code = status;
    this.messages = messages;
    this.result = result;
  }

  public status: string;
  public messages: Array<string | undefined>;
  public result: Object;
  public code: number;
}
