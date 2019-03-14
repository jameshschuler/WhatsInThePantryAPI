import * as express from "express";
import RequestWithUser from "../../models/dto/RequestWithUser";
import { ItemCategoryService } from "../../services/item/ItemCategoryService";
import authMiddleware from "../../utils/middleware/Auth.middleware";
import BaseController from "../BaseController";

class ItemCategoryController extends BaseController {
  public path = "/item_category";
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

      res.status(200).json({ itemCategories });
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
