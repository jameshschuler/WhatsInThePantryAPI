import { ItemCategory } from "../../models/entity/ItemCategory";
import { ValidationException } from "../../utils/exceptions/ValidationException";

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
      throw new ValidationException("NotFound", 404, [
        "Could not find item category."
      ]);
    }

    return itemCategory;
  }
}
