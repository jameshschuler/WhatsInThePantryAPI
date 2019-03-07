import { Request } from "express";

export class RegisterDto {
  constructor(req: Request) {
    this.username = req.body.username;
    this.email = req.body.email;
    this.firstName = req.body.firstName;
    this.lastName = req.body.lastName;
    this.password = req.body.password;
  }

  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
}
