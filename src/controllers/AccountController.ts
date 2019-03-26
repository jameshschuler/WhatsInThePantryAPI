import * as express from "express";
import LoginDto from "../models/dto/LoginDto";
import RequestWithUser from "../models/dto/RequestWithUser";
import { AccountService } from "../services/AccountService";
import authMiddleware from "../utils/middleware/Auth.middleware";
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
    this.router.get(this.path + "/me", authMiddleware, this.getLoggedInUser);
    this.router.get(this.path, authMiddleware, this.getAccountInformation);
  }

  /**
   *
   */
  public login = async (req: express.Request, res: express.Response) => {
    try {
      await this.validateModelState(LoginDto, req.body);

      const { usernameOrEmail, password } = req.body;

      const user = await this.accountService.login(usernameOrEmail, password);

      await res.send({ user });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };

  /**
   *
   */
  public getLoggedInUser = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const user = await this.accountService.getLoggedInUser(req.user!);
      await res.send({ user });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };

  /**
   *
   */
  public getAccountInformation = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const account = await this.accountService.getAccountInformation(
        req.user!
      );
      await res.send({ account });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default AccountController;
