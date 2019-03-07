import express from "express";
import { RegisterDto } from "../dto/RegisterDto";
import { UserService } from "../services/UserService";
import BaseController from "./BaseController";

class UserController extends BaseController {
  public path = this.basePath + "/user";
  public router = express.Router();

  public userService: UserService;

  constructor() {
    super();

    this.userService = new UserService();

    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.post(this.path + "/register", this.register);
  }

  register = async (req: express.Request, res: express.Response) => {
    try {
      const registerDto = new RegisterDto(req);
      const response = await this.userService.createUser(registerDto);

      await res.send(response);
    } catch (error) {
      let errors: any = [];
      error.errors.forEach((element: any) => {
        errors.push({
          property: element.property,
          validationMessages: element.constraints
        });
      });

      await res.send({
        message: error.message,
        errors
      });
    }
  };
}

export default UserController;
