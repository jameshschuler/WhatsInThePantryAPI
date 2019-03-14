import { ItemAmount } from "../../models/entity/ItemAmount";
import { ValidationException } from "../../utils/exceptions/ValidationException";

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
      throw new ValidationException("NotFound", 404, [
        "Could not find item amount."
      ]);
    }

    return itemAmount;
  }
}
