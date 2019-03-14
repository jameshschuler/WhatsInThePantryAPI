import { plainToClass } from "class-transformer";
import express from "express";
import { RegisterDto } from "../models/dto/RegisterDto";
import { UserService } from "../services/UserService";
import BaseController from "./BaseController";

class UserController extends BaseController {
  public path = "/user";
  public router = express.Router();

  private userService: UserService;

  constructor() {
    super();

    this.userService = new UserService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + "/register", this.register);
  }

  public register = async (req: express.Request, res: express.Response) => {
    try {
      await this.validateModelState(RegisterDto, req.body);
      const registerDto = plainToClass(RegisterDto, req.body as RegisterDto);

      const response = await this.userService.createUser(registerDto);

      // TODO: send welcome email

      await res.send(response);
    } catch (err) {
      await res.status(500).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default UserController;
