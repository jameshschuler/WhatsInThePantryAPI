import { ItemAmount } from "../../entity/ItemAmount";
import { ValidationException } from "../../exceptions/ValidationException";

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
