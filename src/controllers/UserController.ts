import express from "express";
import { RegisterDto } from "../dto/RegisterDto";
import { UserService } from "../services/UserService";

class UserController {
  public path = "/user";
  public router = express.Router();

  private userService: UserService;

  constructor() {
    this.userService = new UserService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + "/register", this.register);
  }

  public register = async (req: express.Request, res: express.Response) => {
    try {
      const registerDto = new RegisterDto(req);
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
