import { Item } from "../../entity/Item";

export class ItemService {
  constructor() {}

  /**
   *
   */
  public async getItems(quantity: number = 50): Promise<Array<Item>> {
    const items = await Item.find({
      take: quantity,
      relations: ["itemAmount", "itemCategory", "itemLocation"]
    });

    return items;
  }
}
