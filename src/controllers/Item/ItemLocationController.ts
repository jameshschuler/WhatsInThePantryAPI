import * as express from "express";
import RequestWithUser from "../../models/dto/RequestWithUser";
import { ItemLocationService } from "../../services/item/ItemLocationService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import BaseController from "../BaseController";

class ItemLocationController extends BaseController {
  public path = "/item_location";
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

      res.status(200).json({ itemLocations });
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
