import ItemDto from "../../models/dto/Item/ItemDto";
import { Item } from "../../models/entity/Item";
import { ItemAmount } from "../../models/entity/ItemAmount";
import { ItemCategory } from "../../models/entity/ItemCategory";
import { ItemLocation } from "../../models/entity/ItemLocation";
import { ValidationException } from "../../utils/exceptions/ValidationException";

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

  /**
   *
   */
  public async getItemsByCategory(
    categoryId: number,
    quantity: number = 50
  ): Promise<Array<Item>> {
    const itemCategory = await ItemCategory.findOne({ id: categoryId });
    if (!itemCategory) {
      throw new ValidationException("ValidationError", 400, [
        "Invalid Item Category."
      ]);
    }

    const items = await Item.find({
      where: { itemCategory },
      take: quantity,
      relations: ["itemAmount", "itemCategory", "itemLocation"]
    });

    return items;
  }

  /**
   *
   */
  public async getItemsByLocation(
    locationId: number,
    quantity: number = 50
  ): Promise<Array<Item>> {
    const itemLocation = await ItemLocation.findOne({ id: locationId });
    if (!itemLocation) {
      throw new ValidationException("ValidationError", 400, [
        "Invalid Item Location."
      ]);
    }

    const items = await Item.find({
      where: { itemLocation },
      take: quantity,
      relations: ["itemAmount", "itemCategory", "itemLocation"]
    });

    return items;
  }

  /**
   *
   */
  public async create(itemDto: ItemDto, userId: number): Promise<Item> {
    const {
      itemName,
      price,
      unit,
      itemLocationId,
      itemAmountId,
      itemCategoryId
    } = itemDto;

    const itemLocation = await ItemLocation.findOne({ id: itemLocationId });
    const itemAmount = await ItemAmount.findOne({ id: itemAmountId });
    if (!itemAmount) {
      throw new ValidationException("ValidationError", 400, [
        "Invalid Item Amount."
      ]);
    }

    const itemCategory = await ItemCategory.findOne({ id: itemCategoryId });
    if (!itemCategory) {
      throw new ValidationException("ValidationError", 400, [
        "Invalid Item Category."
      ]);
    }

    const newItem = await Item.create({
      name: itemName,
      price,
      unit,
      itemLocation,
      itemAmount,
      itemCategory,
      createdDate: new Date(),
      lastUpdated: new Date(),
      createdBy: userId
    }).save();

    return newItem;
  }
}
