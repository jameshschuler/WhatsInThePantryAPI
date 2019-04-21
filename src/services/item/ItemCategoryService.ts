import { ItemCategory } from "../../models/entity/ItemCategory";
import { Exception } from "../../utils/exceptions/Exception";
import Status from "../../utils/statusCodes";

export class ItemCategoryService {
  constructor() {}

  /**
   *
   */
  public async getItemCategories(): Promise<Array<ItemCategory>> {
    const itemCategories = await ItemCategory.find({
      order: {
        name: "ASC"
      }
    });

    return itemCategories;
  }

  /**
   *
   * @param id
   */
  public async getItemCategoryById(
    id: number
  ): Promise<ItemCategory | undefined> {
    const itemCategory = await ItemCategory.findOne(id);

    if (!itemCategory) {
      throw new Exception(Status.NotFound, ["Could not find item category."]);
    }

    return itemCategory;
  }
}
