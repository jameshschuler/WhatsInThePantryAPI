import bodyparser from "body-parser";
import cors from "cors";
import express from "express";
import cookieParser = require("cookie-parser");

export default class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Array<any>, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyparser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Array<any>) {
    controllers.forEach(controller => {
      this.app.use("/api", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
