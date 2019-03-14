import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import express from "express";
import { ValidationException } from "../utils/exceptions/ValidationException";
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
        let messages = [];
        for (let i in error.constraints) {
          messages.push(error.constraints[i]);
        }

        parsedErrors.push({
          property: error.property,
          messages
        });
      }

      throw new ValidationException("Validation Error!", 400, parsedErrors);
    }
  }
}
