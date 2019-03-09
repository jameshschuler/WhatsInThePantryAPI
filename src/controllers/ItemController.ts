import * as express from "express";

class ItemController {
  public path = "/item";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getItem);
  }

  public getItem = (_: express.Request, response: express.Response) => {
    response.send("getItem");
  };
}

export default ItemController;
