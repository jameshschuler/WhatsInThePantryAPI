import { plainToClass } from "class-transformer";
import express from "express";
import APIResponse from "../../models/dto/APIResponse";
import { PantryItemDto } from "../../models/dto/pantry/PantryItemDto";
import RequestWithUser from "../../models/dto/RequestWithUser";
import PantryItem from "../../models/entity/PantryItem";
import {
  IPantryItemService,
  PantryItemService
} from "../../services/pantry/PantryItemService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import Status from "../../utils/statusCodes";
import BaseController from "../BaseController";
import IController from "../IController";

class PantryItemController extends BaseController implements IController {
  public path = "/pantry/item";
  public router = express.Router();

  private pantryItemService: IPantryItemService;

  constructor() {
    super();

    this.pantryItemService = new PantryItemService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, authMiddleware, this.addItem);
    this.router.get("/pantry/:id/items", authMiddleware, this.getPantryItems);
  }

  public getPantryItems = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const pantryItems = await this.pantryItemService.getPantryItems(
        req.params.id,
        req.user!
      );
      const plainPantryItems = plainToClass(PantryItem, pantryItems);

      const response = new APIResponse(Status.Ok, [], {
        pantryItems: plainPantryItems
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
   *
   */
  public addItem = async (req: RequestWithUser, res: express.Response) => {
    try {
      await this.validateModelState(PantryItemDto, req.body);

      const pantryItemDto = plainToClass(
        PantryItemDto,
        req.body as PantryItemDto
      );
      await this.pantryItemService.addItem(pantryItemDto, req.user!);

      const response = new APIResponse(
        Status.Created,
        [`Successfully added item to pantry.`],
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
}

export default PantryItemController;
