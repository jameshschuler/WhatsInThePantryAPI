import { plainToClass } from "class-transformer";
import * as express from "express";
import CreateEditItemDto from "../../models/dto/Item/CreateEditItemDto";
import RequestWithUser from "../../models/dto/RequestWithUser";
import Item from "../../models/entity/Item";
import { IItemService, ItemService } from "../../services/item/ItemService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import BaseController from "../BaseController";

class ItemController extends BaseController {
  public path = "/item";
  public router = express.Router();

  private itemService: IItemService;

  constructor() {
    super();
    this.initializeRoutes();

    this.itemService = new ItemService();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.getItemsByUser);
    this.router.post(this.path, authMiddleware, this.create);
    this.router.put(this.path, authMiddleware, this.edit);
    this.router.delete(this.path + "/:id", authMiddleware, this.delete);
  }

  /**
   *
   */
  public create = async (req: RequestWithUser, res: express.Response) => {
    try {
      await this.validateModelState(CreateEditItemDto, req.body);
      const createEditItemDto = plainToClass(
        CreateEditItemDto,
        req.body as CreateEditItemDto
      );
      const user = req.user!;

      await this.itemService.create(createEditItemDto, user);

      res.status(200).json({
        message: `Successfully created item (${createEditItemDto.name}).`
      });
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
  public edit = async (req: RequestWithUser, res: express.Response) => {
    try {
      await this.validateModelState(CreateEditItemDto, req.body, true);
      const createEditItemDto = plainToClass(
        CreateEditItemDto,
        req.body as CreateEditItemDto
      );
      const user = req.user!;

      await this.itemService.update(createEditItemDto, user);

      res.status(200).json({
        message: `Successfully updated item.`
      });
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
  public delete = async (req: RequestWithUser, res: express.Response) => {
    try {
      const user = req.user!;
      const id = req.params.id;

      await this.itemService.delete(id, user);

      res.status(200).json({
        message: `Item was deleted.`
      });
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
  public getItemsByUser = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const user = req.user!;
      const items = await this.itemService.getItemsByUserId(user.id, 50);
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
