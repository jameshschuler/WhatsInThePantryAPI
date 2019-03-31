import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import express from "express";
import { ErrorType, Exception } from "../utils/exceptions/Exception";
import IController from "./IController";

export default class BaseController implements IController {
  public path: string;
  public router: express.Router;

  public async validateModelState(
    type: any,
    body: express.Request,
    skipMissingProperties = false
  ) {
    const errors = await validate(plainToClass(type, body), {
      skipMissingProperties
    });

    if (errors.length > 0) {
      let parsedErrors = [];
      for (let error of errors) {
        const message = Object.values(error.constraints);
        parsedErrors.push(...message);
      }

      throw new Exception(ErrorType.Validation, 400, parsedErrors);
    }
  }
}
