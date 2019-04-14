import { plainToClass } from "class-transformer";
import * as express from "express";
import APIResponse from "../../models/dto/APIResponse";
import RequestWithUser from "../../models/dto/RequestWithUser";
import { ItemLocation } from "../../models/entity/ItemLocation";
import { ItemLocationService } from "../../services/item/ItemLocationService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import BaseController from "../BaseController";

class ItemLocationController extends BaseController {
  public path = "/item/location";
  public router = express.Router();

  private itemLocationService: ItemLocationService;

  constructor() {
    super();
    this.initializeRoutes();

    this.itemLocationService = new ItemLocationService();
  }

  /**
   *
   */
  private initializeRoutes() {
    this.router.get(
      this.path + "/:id",
      authMiddleware,
      this.getItemLocationById
    );
    this.router.get(this.path, authMiddleware, this.getItemLocations);
  }

  /**
   *
   */
  public getItemLocations = async (
    _: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const itemLocations = await this.itemLocationService.getItemLocations();

      const plainItemLocations = plainToClass(ItemLocation, itemLocations);
      const response = new APIResponse("ok", 200, [], {
        itemLocations: plainItemLocations
      });

      res.json(response);
    } catch (err) {
      const { status, ErrorType, message, errors } = err;

      res.status(status).send(
        new APIResponse(ErrorType, status, [message], {
          errors
        })
      );
    }
  };

  /**
   *
   */
  public getItemLocationById = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const id = req.params.id;
      const itemLocation = await this.itemLocationService.getItemLocationById(
        id
      );

      res.status(200).json({ itemLocation });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default ItemLocationController;
