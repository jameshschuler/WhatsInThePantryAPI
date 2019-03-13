import * as express from "express";
import RequestWithUser from "../../dto/RequestWithUser";
import { ItemLocation } from "../../entity/ItemLocation";
import authMiddleware from "../../middleware/Auth.middleware";
import BaseController from "../BaseController";

class ItemLocationController extends BaseController {
  public path = "/item_location";
  public router = express.Router();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, authMiddleware, this.getItemLocations);
  }

  public getItemLocations = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    const user = req.user;
    console.log(user);

    // TODO: move to service
    const items = await ItemLocation.find({
      order: {
        name: "ASC"
      }
    });

    // TODO: test validating headers / token
    res.status(200).json({ items });
  };
}

export default ItemLocationController;
