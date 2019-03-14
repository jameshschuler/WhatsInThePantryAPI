import { ItemLocation } from "../../models/entity/ItemLocation";
import { ValidationException } from "../../utils/exceptions/ValidationException";

export class ItemLocationService {
  constructor() {}

  /**
   *
   */
  public async getItemLocations(): Promise<Array<ItemLocation>> {
    const itemLocations = await ItemLocation.find({
      order: {
        name: "ASC"
      }
    });

    return itemLocations;
  }

  /**
   *
   * @param id
   */
  public async getItemLocationById(
    id: number
  ): Promise<ItemLocation | undefined> {
    const itemLocation = await ItemLocation.findOne(id);

    if (!itemLocation) {
      throw new ValidationException("NotFound", 404, [
        "Could not find item location."
      ]);
    }

    return itemLocation;
  }
}
