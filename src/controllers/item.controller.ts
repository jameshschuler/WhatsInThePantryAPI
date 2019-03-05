import * as express from "express";
import BaseController from "./base.controller";

class ItemController extends BaseController {
  public path = this.basePath + "/item";
  public router = express.Router();

  constructor() {
    super();

    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get(this.path, this.getItem);
  }

  getItem = (_: express.Request, response: express.Response) => {
    response.send("getItem");
  };
}

export default ItemController;
