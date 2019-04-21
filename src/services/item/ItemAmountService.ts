import { ItemAmount } from "../../models/entity/ItemAmount";
import { Exception } from "../../utils/exceptions/Exception";
import Status from "../../utils/statusCodes";

export class ItemAmountService {
  constructor() {}

  /**
   *
   */
  public async getItemAmounts(): Promise<Array<ItemAmount>> {
    const itemAmounts = await ItemAmount.find();

    return itemAmounts;
  }

  /**
   *
   * @param id
   */
  public async getItemAmountById(id: number): Promise<ItemAmount | undefined> {
    const itemAmount = await ItemAmount.findOne(id);

    if (!itemAmount) {
      throw new Exception(Status.NotFound, ["Could not find item amount."]);
    }

    return itemAmount;
  }
}
