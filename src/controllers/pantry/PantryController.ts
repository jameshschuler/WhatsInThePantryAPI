import { plainToClass } from "class-transformer";
import express from "express";
import { PantryDto } from "../../models/dto/pantry/PantryDto";
import RequestWithUser from "../../models/dto/RequestWithUser";
import {
  IPantryService,
  PantryService
} from "../../services/pantry/PantryService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import BaseController from "../BaseController";
import IController from "../IController";

class PantryContoller extends BaseController implements IController {
  public path = "/pantry";
  public router = express.Router();

  private pantryService: IPantryService;

  constructor() {
    super();

    this.pantryService = new PantryService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, authMiddleware, this.create);
    this.router.get(this.path + "/:id", authMiddleware, this.getPantry);
  }

  public getPantry = async (req: RequestWithUser, res: express.Response) => {
    try {
      const pantry = await this.pantryService.getPantry(
        req.params.id,
        req.user!
      );

      await res.status(200).send(pantry);
    } catch (err) {
      await res.status(500).send({
        message: err.message,
        errors: err.errors
      });
    }
  };

  /**
   *
   */
  public create = async (req: RequestWithUser, res: express.Response) => {
    try {
      await this.validateModelState(PantryDto, req.body);

      const pantryDto = plainToClass(PantryDto, req.body as PantryDto);
      const user = req.user!;
      const pantry = await this.pantryService.create(pantryDto, user);

      await res.status(200).send(pantry);
    } catch (err) {
      await res.status(500).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default PantryContoller;
