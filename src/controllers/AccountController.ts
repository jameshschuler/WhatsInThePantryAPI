import * as express from "express";
import { AccountService } from "../services/AccountService";

class AccountController {
  public path = "/account";
  public router = express.Router();

  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + "/login", this.login);
  }

  public login = async (req: express.Request, res: express.Response) => {
    try {
      // TODO: validate using LoginDto
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
