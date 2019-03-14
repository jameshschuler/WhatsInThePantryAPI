import * as express from "express";
import RequestWithUser from "../../models/dto/RequestWithUser";
import { ItemAmountService } from "../../services/item/ItemAmountService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import BaseController from "../BaseController";

class ItemAmountController extends BaseController {
  public path = "/item_amount";
  public router = express.Router();

  private itemAmountService: ItemAmountService;

  constructor() {
    super();
    this.initializeRoutes();

    this.itemAmountService = new ItemAmountService();
  }

  /**
   *
   */
  private initializeRoutes() {
    this.router.get(this.path + "/:id", authMiddleware, this.getItemAmountById);
    this.router.get(this.path, authMiddleware, this.getItemAmounts);
  }

  /**
   *
   */
  public getItemAmounts = async (_: RequestWithUser, res: express.Response) => {
    try {
      const itemAmounts = await this.itemAmountService.getItemAmounts();

      res.status(200).json({ itemAmounts });
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
  public getItemAmountById = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const id = req.params.id;
      const itemAmount = await this.itemAmountService.getItemAmountById(id);

      res.status(200).json({ itemAmount });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default ItemAmountController;
