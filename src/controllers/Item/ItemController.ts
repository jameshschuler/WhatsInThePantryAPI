import { plainToClass } from "class-transformer";
import * as express from "express";
import ItemDto from "../../models/dto/Item/ItemDto";
import RequestWithUser from "../../models/dto/RequestWithUser";
import Item from "../../models/entity/Item";
import { ItemService } from "../../services/item/ItemService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import BaseController from "../BaseController";

class ItemController extends BaseController {
  public path = "/item";
  public router = express.Router();

  private itemService: ItemService;

  constructor() {
    super();
    this.initializeRoutes();

    this.itemService = new ItemService();
  }

  private initializeRoutes() {
    this.router.get(
      this.path + "/category/:id",
      authMiddleware,
      this.getItemsByCategory
    );
    this.router.get(
      this.path + "/location/:id",
      authMiddleware,
      this.getItemsByLocation
    );
    this.router.get(this.path, authMiddleware, this.getItems);
    this.router.get(`${this.path}/me`, authMiddleware, this.getItemsByUserId);
    this.router.post(this.path, authMiddleware, this.createItem);
    this.router.put(this.path, authMiddleware, this.updateItem);
  }

  /**
   *
   */
  public createItem = async (req: RequestWithUser, res: express.Response) => {
    try {
      await this.validateModelState(ItemDto, req.body);
      const itemDto = plainToClass(ItemDto, req.body as ItemDto);
      const user = req.user!;

      const item = await this.itemService.create(itemDto, user.id);

      res.status(200).json({ item });
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
  public updateItem = async (req: RequestWithUser, res: express.Response) => {
    try {
      await this.validateModelState(ItemDto, req.body, true);
      const itemDto = plainToClass(ItemDto, req.body as ItemDto);
      const user = req.user!;

      const item = await this.itemService.update(itemDto, user.id);
      const plainItem = plainToClass(Item, item);

      res.status(200).json({ item: plainItem });
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

  /**
   *
   */
  public getItemsByUserId = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const user = req.user!;
      const items = await this.itemService.getItemsByUserId(user.id);
      const plainItems = plainToClass(Item, items);

      res.status(200).json({ items: plainItems });
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
  public getItemsByCategory = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const id = req.params.id;
      const items = await this.itemService.getItemsByCategory(id);
      const plainItems = plainToClass(Item, items);

      res.status(200).json({ items: plainItems });
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
  public getItemsByLocation = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const id = req.params.id;
      const items = await this.itemService.getItemsByLocation(id);
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
