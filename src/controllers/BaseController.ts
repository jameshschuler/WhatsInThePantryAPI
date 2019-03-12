import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import express from "express";
import { ValidationException } from "../exceptions/ValidationException";

export default class BaseController {
  public async validateModelState(type: any, body: express.Request) {
    const errors = await validate(plainToClass(type, body));
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
