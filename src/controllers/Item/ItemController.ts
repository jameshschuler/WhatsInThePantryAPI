import { plainToClass } from "class-transformer";
import * as express from "express";
import RequestWithUser from "../../dto/RequestWithUser";
import { Item } from "../../entity/Item";
import authMiddleware from "../../middleware/Auth.middleware";
import { ItemService } from "../../services/item/ItemService";
import BaseController from "../BaseController";

class ItemController extends BaseController {
  private path = "/item";
  private router = express.Router();

  private itemService: ItemService;

  constructor() {
    super();
    this.initializeRoutes();

    this.itemService = new ItemService();
  }

  private initializeRoutes() {
    this.router.get(this.path, authMiddleware, this.getItems);
  }

  /**
   *
   */
  public getItems = async (_: RequestWithUser, res: express.Response) => {
    try {
      const items = await this.itemService.getItems();
      const plainItems = plainToClass(Item, items);

      res.status(200).json({ items: plainItems });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default ItemController;
