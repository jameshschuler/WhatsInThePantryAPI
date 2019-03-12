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

  public getItem = (req: express.Request, response: express.Response) => {
    console.log(req.headers);

    // TODO: test validating headers / token
    response.send("getItem");
  };
}

export default ItemController;
