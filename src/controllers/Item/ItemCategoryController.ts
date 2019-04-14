import { plainToClass } from "class-transformer";
import * as express from "express";
import APIResponse from "../../models/dto/APIResponse";
import RequestWithUser from "../../models/dto/RequestWithUser";
import { ItemCategory } from "../../models/entity/ItemCategory";
import { ItemCategoryService } from "../../services/item/ItemCategoryService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import BaseController from "../BaseController";

class ItemCategoryController extends BaseController {
  public path = "/item/category";
  public router = express.Router();

  private itemCategoryService: ItemCategoryService;

  constructor() {
    super();
    this.initializeRoutes();

    this.itemCategoryService = new ItemCategoryService();
  }

  /**
   *
   */
  private initializeRoutes() {
    this.router.get(
      this.path + "/:id",
      authMiddleware,
      this.getItemCategoryById
    );
    this.router.get(this.path, authMiddleware, this.getItemCategories);
  }

  /**
   *
   */
  public getItemCategories = async (
    _: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const itemCategories = await this.itemCategoryService.getItemCategories();

      const plainItemCategories = plainToClass(ItemCategory, itemCategories);
      const response = new APIResponse("ok", 200, [], {
        itemCategories: plainItemCategories
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
  public getItemCategoryById = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    try {
      const id = req.params.id;
      const itemCategory = await this.itemCategoryService.getItemCategoryById(
        id
      );

      res.status(200).json({ itemCategory });
    } catch (err) {
      await res.status(err.status).send({
        message: err.message,
        errors: err.errors
      });
    }
  };
}

export default ItemCategoryController;
