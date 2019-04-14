export default class APIResponse {
  constructor(
    status: string,
    code: number,
    messages: Array<string | undefined>,
    result: Object
  ) {
    this.status = status;
    this.code = code;
    this.messages = messages;
    this.result = result;
  }

  public status: string;
  public code: number;
  public messages: Array<string | undefined>;
  public result: Object;
}
