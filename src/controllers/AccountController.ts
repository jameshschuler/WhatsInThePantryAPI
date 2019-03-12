import * as express from "express";
import LoginDto from "../dto/LoginDto";
import { AccountService } from "../services/AccountService";
import BaseController from "./BaseController";

class AccountController extends BaseController {
  public path = "/account";
  public router = express.Router();

  private accountService: AccountService;

  constructor() {
    super();

    this.accountService = new AccountService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + "/login", this.login);
  }

  public login = async (req: express.Request, res: express.Response) => {
    try {
      await this.validateModelState(LoginDto, req.body);

      const { usernameOrEmail, password } = req.body;

      const data = await this.accountService.login(usernameOrEmail, password);

      await res.send({ user: data });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default AccountController;
