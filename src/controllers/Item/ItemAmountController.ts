import { plainToClass } from "class-transformer";
import * as express from "express";
import APIResponse from "../../models/dto/APIResponse";
import RequestWithUser from "../../models/dto/RequestWithUser";
import { ItemAmount } from "../../models/entity/ItemAmount";
import { ItemAmountService } from "../../services/item/ItemAmountService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import Status from "../../utils/statusCodes";
import BaseController from "../BaseController";

class ItemAmountController extends BaseController {
  public path = "/item/amount";
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
      const plainItemAmounts = plainToClass(ItemAmount, itemAmounts);
      const response = new APIResponse(Status.Ok, [], {
        itemAmounts: plainItemAmounts
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
