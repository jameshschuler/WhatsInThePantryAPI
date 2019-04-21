import { plainToClass } from "class-transformer";
import express from "express";
import APIResponse from "../../models/dto/APIResponse";
import CreateEditPantryDto from "../../models/dto/pantry/CreateEditPantryDto";
import RequestWithUser from "../../models/dto/RequestWithUser";
import {
  IPantryService,
  PantryService
} from "../../services/pantry/PantryService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import Status from "../../utils/statusCodes";
import BaseController from "../BaseController";

class PantryContoller extends BaseController {
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
    this.router.get(this.path, authMiddleware, this.getPantries);
  }

  public getPantries = async (req: RequestWithUser, res: express.Response) => {
    try {
      const pantries = await this.pantryService.getPantries(req.user!);
      const response = new APIResponse(Status.Ok, [], {
        pantries
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

  public getPantry = async (req: RequestWithUser, res: express.Response) => {
    try {
      const pantry = await this.pantryService.getPantry(
        req.params.id,
        req.user!
      );

      const response = new APIResponse(Status.Ok, [], {
        pantry
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
  public create = async (req: RequestWithUser, res: express.Response) => {
    try {
      await this.validateModelState(CreateEditPantryDto, req.body);

      const pantryDto = plainToClass(
        CreateEditPantryDto,
        req.body as CreateEditPantryDto
      );
      const user = req.user!;
      await this.pantryService.create(pantryDto, user);

      const response = new APIResponse(
        Status.Created,
        [`Successfully created pantry (${pantryDto.name}).`],
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

export default PantryContoller;
