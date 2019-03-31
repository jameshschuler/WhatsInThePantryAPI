import { ItemCategory } from "../../models/entity/ItemCategory";
import { ErrorType, Exception } from "../../utils/exceptions/Exception";

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
      throw new Exception(ErrorType.NotFound, 404, [
        "Could not find item category."
      ]);
    }

    return itemCategory;
  }
}
