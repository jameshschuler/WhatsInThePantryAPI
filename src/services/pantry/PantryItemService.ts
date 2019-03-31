import { PantryItemDto } from "../../models/dto/pantry/PantryItemDto";
import Item from "../../models/entity/Item";
import { Pantry } from "../../models/entity/Pantry";
import PantryItem from "../../models/entity/PantryItem";
import User from "../../models/entity/User";
import { ErrorType, Exception } from "../../utils/exceptions/Exception";

export interface IPantryItemService {
  addItem(pantryItemDto: PantryItemDto, user: User): Promise<void>;
}

export class PantryItemService implements IPantryItemService {
  constructor() {}

  public async addItem(
    pantryItemDto: PantryItemDto,
    user: User
  ): Promise<void> {
    // TODO: how can we handle adding an item to a pantry we don't own?
    const pantry = await Pantry.findOne({
      where: {
        id: pantryItemDto.pantryId,
        createdBy: user.id
      },
      relations: ["pantryItems"]
    });

    if (!pantry)
      throw new Exception(ErrorType.NotFound, 404, ["Unable to find pantry."]);

    const item = await Item.findOne({
      id: pantryItemDto.itemId,
      createdBy: user.id
    });

    if (!item)
      throw new Exception(ErrorType.NotFound, 404, ["Unable to find item."]);

    const doesAlreadyExist = this.doesItemAlreadyExist(pantry, item);
    if (doesAlreadyExist) {
      throw new Exception(ErrorType.Validation, 400, [
        "Item has already been added to this pantry."
      ]);
    }

    // We're good to add item to pantry
    await PantryItem.create({
      itemId: item.id,
      pantryId: pantry.id,
      createdBy: user.id
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
