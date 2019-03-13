import * as express from "express";
import ItemDto from "../dto/Item/ItemDto";
import RequestWithUser from "../dto/RequestWithUser";
import authMiddleware from "../middleware/Auth.middleware";
import BaseController from "./BaseController";

class ItemController extends BaseController {
  public path = "/item";
  public router = express.Router();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, authMiddleware, this.getItem);
    this.router.post(this.path, authMiddleware, this.createItem);
  }

  public createItem = async (req: RequestWithUser, res: express.Response) => {
    const user = req.user;
    console.log(user);
    try {
      await this.validateModelState(ItemDto, req.body);

      res.send("createItem");
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };

  public getItem = async (req: RequestWithUser, res: express.Response) => {
    const user = req.user;
    console.log(user);

    // TODO: test validating headers / token
    res.send("getItem");
  };
}

export default ItemController;
