import ItemDto from "../../models/dto/Item/ItemDto";
import Item from "../../models/entity/Item";
import { ItemAmount } from "../../models/entity/ItemAmount";
import { ItemCategory } from "../../models/entity/ItemCategory";
import { ItemLocation } from "../../models/entity/ItemLocation";
import { ValidationException } from "../../utils/exceptions/ValidationException";

interface IItemService {
  /**
   * @description - Gets all items (max: 50)
   */
  getItems(): Promise<Array<Item>>;

  /**
   * @description - Gets all items created by current logged in user (max: 50)
   */
  getItemsByUserId(userId: number, quantity: number): Promise<Array<Item>>;

  /**
   *
   * @param categoryId
   * @param quantity
   */
  getItemsByCategory(
    categoryId: number,
    quantity: number
  ): Promise<Array<Item>>;

  /**
   *
   * @param locationId
   * @param quantity
   */
  getItemsByLocation(
    locationId: number,
    quantity: number
  ): Promise<Array<Item>>;

  /**
   *
   * @param itemDto
   * @param userId
   */
  update(itemDto: ItemDto, userId: number): Promise<Item>;

  /**
   *
   * @param itemDto
   * @param userId
   */
  create(itemDto: ItemDto, userId: number): Promise<Item>;
}

export class ItemService implements IItemService {
  constructor() {}

  public async getItems(quantity: number = 50): Promise<Array<Item>> {
    const items = await Item.find({
      take: quantity,
      relations: [
        "itemAmount",
        "currentItemAmount",
        "itemCategory",
        "itemLocation"
      ]
    });

    return items;
  }

  public async getItemsByUserId(
    userId: number,
    quantity: number = 50
  ): Promise<Array<Item>> {
    const items = await Item.find({
      where: {
        createdBy: userId
      },
      take: quantity,
      relations: [
        "itemAmount",
        "itemCategory",
        "itemLocation",
        "currentItemAmount"
      ]
    });

    return items;
  }

  public async getItemsByCategory(
    categoryId: number,
    quantity: number = 50
  ): Promise<Array<Item>> {
    const itemCategory = await ItemCategory.findOne({ id: categoryId });
    if (!itemCategory) {
      throw new ValidationException("NotFoundError", 404, [
        "Invalid Item Category."
      ]);
    }

    const items = await Item.find({
      where: { itemCategory },
      take: quantity,
      relations: [
        "itemAmount",
        "itemCategory",
        "itemLocation",
        "currentItemAmount"
      ]
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
      throw new ValidationException("NotFoundError", 404, [
        "Invalid Item Location."
      ]);
    }

    const items = await Item.find({
      where: { itemLocation },
      take: quantity,
      relations: [
        "itemAmount",
        "itemCategory",
        "itemLocation",
        "currentItemAmount"
      ]
    });

    return items;
  }

  /**
   * @description - Gets all items created by current logged in user (max: 50)
   */
  public async update(itemDto: ItemDto, userId: number): Promise<Item> {
    const item = await Item.findOne({
      where: {
        createdBy: userId,
        id: itemDto.id
      },
      relations: [
        "itemAmount",
        "itemCategory",
        "itemLocation",
        "currentItemAmount"
      ]
    });

    if (!item) {
      throw new ValidationException("NotFoundError", 404, ["Item not found."]);
    }
    const {
      name,
      price,
      unit,
      description,
      itemCategoryId,
      itemAmountId,
      currentItemAmountId,
      itemLocationId
    } = itemDto;

    // update item data
    item.name = name || item.name;
    item.price = price || item.price;
    item.unit = unit || item.unit;
    item.description = description || item.description;
    item.updatedAt = new Date();

    // Update entity relations
    item.itemCategory =
      (await this.getItemCategory(itemCategoryId)) || item.itemCategory;
    item.itemAmount =
      (await this.getItemAmount(itemAmountId)) || item.itemAmount;
    item.currentItemAmount =
      (await this.getItemAmount(currentItemAmountId)) || item.currentItemAmount;

    item.itemLocation =
      itemLocationId !== undefined
        ? (await this.getItemLocation(itemLocationId)) || item.itemLocation
        : item.itemLocation;

    const updatedItem = await item.save();
    return updatedItem;
  }

  public async create(itemDto: ItemDto, userId: number): Promise<Item> {
    const {
      name,
      price,
      unit,
      description,
      itemLocationId,
      itemAmountId,
      itemCategoryId
    } = itemDto;

    const itemLocation = await ItemLocation.findOne({ id: itemLocationId });
    const itemAmount = await ItemAmount.findOne({ id: itemAmountId });
    if (!itemAmount) {
      throw new ValidationException("NotFoundError", 404, [
        "Invalid Item Amount."
      ]);
    }

    const itemCategory = await ItemCategory.findOne({ id: itemCategoryId });
    if (!itemCategory) {
      throw new ValidationException("NotFoundError", 404, [
        "Invalid Item Category."
      ]);
    }

    const newItem = await Item.create({
      name,
      price,
      unit,
      description,
      itemLocation,
      itemAmount,
      currentItemAmount: itemAmount,
      itemCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId
    }).save();

    return newItem;
  }

  /**
   *
   * @param id
   */
  private async getItemCategory(id: number): Promise<ItemCategory | undefined> {
    return await ItemCategory.findOne(id);
  }

  /**
   *
   * @param id
   */
  private async getItemAmount(id: number): Promise<ItemAmount | undefined> {
    return await ItemAmount.findOne(id);
  }

  /**
   *
   * @param id
   */
  private async getItemLocation(id: number): Promise<ItemLocation | undefined> {
    return await ItemLocation.findOne(id);
  }
}
