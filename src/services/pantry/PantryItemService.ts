import { PantryItemDto } from "../../models/dto/pantry/PantryItemDto";
import Item from "../../models/entity/Item";
import { ItemAmount } from "../../models/entity/ItemAmount";
import { ItemLocation } from "../../models/entity/ItemLocation";
import { Pantry } from "../../models/entity/Pantry";
import PantryItem from "../../models/entity/PantryItem";
import User from "../../models/entity/User";
import { Exception } from "../../utils/exceptions/Exception";
import Status from "../../utils/statusCodes";

export interface IPantryItemService {
  /**
   *
   * @param pantryItemDto
   * @param user
   */
  addItem(pantryItemDto: PantryItemDto, user: User): Promise<void>;

  /**
   *
   * @param pantryId
   * @param user
   */
  getPantryItems(pantryId: number, user: User): Promise<Array<PantryItem>>;
}

export class PantryItemService implements IPantryItemService {
  public async getPantryItems(
    pantryId: number,
    user: User
  ): Promise<Array<PantryItem>> {
    const pantry = await Pantry.findOne({
      id: pantryId
    });

    if (!pantry) {
      throw new Exception(Status.NotFound, ["Unable to find pantry."]);
    }

    const pantryItems = await PantryItem.find({
      where: {
        createdBy: user.id,
        pantry: pantry
      },
      select: ["price", "unit"],
      relations: ["item"]
    });

    return pantryItems;
  }

  public async addItem(
    pantryItemDto: PantryItemDto,
    user: User
  ): Promise<void> {
    const {
      pantryId,
      itemId,
      price,
      unit,
      itemAmountId,
      itemLocationId
    } = pantryItemDto;

    const pantry = await Pantry.findOne({
      where: {
        id: pantryId,
        createdBy: user.id
      },
      relations: ["pantryItems"]
    });

    if (!pantry)
      throw new Exception(Status.NotFound, ["Unable to find pantry."]);

    const item = await Item.findOne({
      id: itemId,
      createdBy: user.id
    });

    if (!item) throw new Exception(Status.NotFound, ["Unable to find item."]);

    const doesAlreadyExist = this.doesItemAlreadyExist(pantry, item);
    if (doesAlreadyExist) {
      throw new Exception(Status.BadRequest, [
        "Item has already been added to this pantry."
      ]);
    }

    const itemAmount = await await ItemAmount.findOne({
      id: itemAmountId
    });
    if (!item)
      throw new Exception(Status.NotFound, ["Unable to find item amount."]);

    let itemLocation = undefined;
    if (itemLocationId) {
      itemLocation = await ItemLocation.findOne({
        id: itemLocationId
      });
    }

    // We're good to add item to pantry
    await PantryItem.create({
      itemId: item.id,
      pantryId: pantry.id,
      createdBy: user.id,
      price,
      unit,
      itemAmount,
      itemLocation
    }).save();
  }

  /**
   * @description - checks if a given item has already been added to a given pantry
   */
  private doesItemAlreadyExist(pantry: Pantry, item: Item): boolean {
    if (pantry.pantryItems && pantry.pantryItems.length > 0) {
      for (let pantryItem of pantry.pantryItems) {
        if (pantryItem.itemId === item.id) {
          // This item is already added to this pantry
          return true;
        }
      }
    }
    return false;
  }
}
