import { ItemLocation } from "../../models/entity/ItemLocation";
import { Exception } from "../../utils/exceptions/Exception";
import Status from "../../utils/statusCodes";

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
      throw new Exception(Status.NotFound, ["Could not find item location."]);
    }

    return itemLocation;
  }
}
