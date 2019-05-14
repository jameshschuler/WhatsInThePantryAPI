import { plainToClass } from "class-transformer";
import * as express from "express";
import APIResponse from "../../models/dto/APIResponse";
import CreateEditItemDto from "../../models/dto/item/CreateEditItemDto";
import RequestWithUser from "../../models/dto/RequestWithUser";
import Item from "../../models/entity/Item";
import { IItemService, ItemService } from "../../services/item/ItemService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import Status from "../../utils/statusCodes";
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
    this.router.get(this.path + "/:id", authMiddleware, this.getItem);
    this.router.get(`${this.path}`, authMiddleware, this.getItemsByUser);
    this.router.get(
      `${this.path}/autocomplete`,
      authMiddleware,
      this.getItemsAutocomplete
    );

    this.router.post(this.path, authMiddleware, this.create);
    this.router.put(this.path, authMiddleware, this.update);
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

      const response = new APIResponse(
        Status.Created,
        [`Successfully created item (${createEditItemDto.name}).`],
        {}
      );

      res.json(response);
    } catch (err) {
      const { status, code, errors, message } = err;

      res.status(code).send(
        new APIResponse(Status[status] as any, [message], {
          errors
        })
      );
    }
  };

  /**
   *
   */
  public update = async (req: RequestWithUser, res: express.Response) => {
    try {
      await this.validateModelState(CreateEditItemDto, req.body, true);
      const createEditItemDto = plainToClass(
        CreateEditItemDto,
        req.body as CreateEditItemDto
      );
      const user = req.user!;

      await this.itemService.update(createEditItemDto, user);

      const response = new APIResponse(
        Status.Ok,
        [`Successfully updated item.`],
        {}
      );

      res.json(response);
    } catch (err) {
      const { status, code, errors, message } = err;

      res.status(code).send(
        new APIResponse(Status[status] as any, [message], {
          errors
        })
      );
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

      const response = new APIResponse(
        Status.Ok,
        [`Successfully deleted item.`],
        {}
      );
      res.json(response);
    } catch (err) {
      const { status, code, errors, message } = err;

      res.status(code).send(
        new APIResponse(Status[status] as any, [message], {
          errors
        })
      );
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
      const response = new APIResponse(Status.Ok, [], {
        items: plainItems
      });

      res.json(response);
    } catch (err) {
      const { status, code, errors, message } = err;

      res.status(code).send(
        new APIResponse(Status[status] as any, [message], {
          errors
        })
      );
    }
  };

  /**
   * @description - Gets an item given a user id and item id
   */
  public getItem = async (req: RequestWithUser, res: express.Response) => {
    try {
      const user = req.user!;
      const id = req.params.id;

      const item = await this.itemService.getItem(user.id, id);
      const plainItem = plainToClass(Item, item);
      const response = new APIResponse(Status.Ok, [], {
        item: plainItem
      });

      res.json(response);
    } catch (err) {
      const { status, code, errors, message } = err;

      res.status(code).send(
        new APIResponse(Status[status] as any, [message], {
          errors
        })
      );
    }
  };

  public getItemsAutocomplete = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const user = req.user!;
      const items = await this.itemService.getItemsAutocomplete(user.id);

      res.status(200).json({ items });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default ItemController;
