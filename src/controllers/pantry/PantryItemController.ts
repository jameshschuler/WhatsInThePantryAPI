import { plainToClass } from "class-transformer";
import express from "express";
import { PantryItemDto } from "../../models/dto/pantry/PantryItemDto";
import RequestWithUser from "../../models/dto/RequestWithUser";
import {
  IPantryItemService,
  PantryItemService
} from "../../services/pantry/PantryItemService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
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
  }

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

      await res.status(200).send();
    } catch (err) {
      console.log({ err });
      await res.status(500).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default PantryItemController;
