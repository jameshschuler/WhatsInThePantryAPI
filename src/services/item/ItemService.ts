import { default as CreateEditItemDto } from "../../models/dto/item/CreateEditItemDto";
import Item from "../../models/entity/Item";
import { ItemAmount } from "../../models/entity/ItemAmount";
import { ItemCategory } from "../../models/entity/ItemCategory";
import { ItemLocation } from "../../models/entity/ItemLocation";
import User from "../../models/entity/User";
import { ErrorType, Exception } from "../../utils/exceptions/Exception";

export interface IItemService {
  /**
   * @description - Gets all items created by current logged in user (max: 50)
   */
  getItemsByUserId(userId: number, quantity: number): Promise<Array<Item>>;

  /**
   *
   * @param createEditItemDto
   * @param user
   */
  update(createEditItemDto: CreateEditItemDto, user: User): Promise<void>;

  /**
   *
   * @param createEditItemDto
   * @param user
   */
  create(createEditItemDto: CreateEditItemDto, user: User): Promise<void>;

  /**
   *
   * @param itemId
   * @param user
   */
  delete(itemId: number, user: User): Promise<void>;
}

export class ItemService implements IItemService {
  public async getItemsByUserId(
    userId: number,
    quantity: number = 50
  ): Promise<Array<Item>> {
    const items = await Item.find({
      where: {
        createdBy: userId
      },
      take: quantity,
      relations: ["defaultItemAmount", "itemCategory", "defaultItemLocation"]
    });

    return items;
  }

  public async update(
    createEditItemDto: CreateEditItemDto,
    user: User
  ): Promise<void> {
    const {
      id,
      name,
      description,
      itemCategoryId,
      defaultItemAmountId,
      defaultItemLocationId
    } = createEditItemDto;
    const item = await this.getUserItem(id, user);

    item.name = name || item.name;
    item.description = description || item.description;
    item.itemCategory =
      itemCategoryId !== undefined
        ? await this.getItemCategory(itemCategoryId)
        : item.itemCategory;
    item.defaultItemAmount =
      defaultItemAmountId !== undefined
        ? await this.getItemAmount(defaultItemAmountId)
        : item.defaultItemAmount;

    if (defaultItemLocationId !== undefined) {
      item.defaultItemLocation = await this.getItemLocation(
        defaultItemLocationId
      );
    }

    await item.save();
  }

  public async create(
    createEditItemDto: CreateEditItemDto,
    user: User
  ): Promise<void> {
    const {
      name,
      description,
      itemCategoryId,
      defaultItemAmountId,
      defaultItemLocationId
    } = createEditItemDto;

    const itemCategory = await this.getItemCategory(itemCategoryId);
    const itemAmount = await this.getItemAmount(defaultItemAmountId);
    const itemLocation =
      defaultItemLocationId !== undefined
        ? await this.getItemLocation(defaultItemLocationId)
        : undefined;

    await Item.create({
      name,
      description,
      createdBy: user.id,
      user,
      itemCategory,
      defaultItemAmount: itemAmount,
      defaultItemLocation: itemLocation
    }).save();
  }

  public async delete(itemId: number, user: User): Promise<void> {
    console.log(itemId, user);
    // TODO: will need to decide how deleting affects pantry items
    throw new Error("Method not implemented.");
  }

  /**
   *
   * @param itemId
   * @param user
   */
  private async getUserItem(itemId: number, user: User): Promise<Item> {
    const item = await Item.findOne({
      id: itemId,
      user
    });

    if (!item) {
      throw new Exception(ErrorType.NotFound, 404, ["Item not found."]);
    }

    return item;
  }

  /**
   *
   * @param id
   */
  private async getItemCategory(id: number): Promise<ItemCategory> {
    const itemCategory = await ItemCategory.findOne(id);
    if (!itemCategory) {
      throw new Exception(ErrorType.NotFound, 404, [
        "Item Category not found."
      ]);
    }

    return itemCategory;
  }

  /**
   *
   * @param id
   */
  private async getItemAmount(id: number): Promise<ItemAmount> {
    const itemAmount = await ItemAmount.findOne(id);
    if (!itemAmount) {
      throw new Exception(ErrorType.NotFound, 404, ["Item Amount not found."]);
    }

    return itemAmount;
  }

  /**
   *
   * @param id
   */
  private async getItemLocation(id: number): Promise<ItemLocation> {
    const itemLocation = await ItemLocation.findOne(id);
    if (!itemLocation) {
      throw new Exception(ErrorType.NotFound, 404, [
        "Item Location not found."
      ]);
    }

    return itemLocation;
  }
}
