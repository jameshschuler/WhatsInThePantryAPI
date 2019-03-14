import { IsNotEmpty, IsString } from "class-validator";

class ItemDto {
  @IsString()
  @IsNotEmpty({ message: "Must enter an item name." })
  public itemName: string;

  public price: string;

  public unit: string;

  public itemLocationId?: number;

  @IsNotEmpty({ message: "Must select a default item amount." })
  public itemAmountId: number;

  @IsNotEmpty({ message: "Must select a default item category." })
  public itemCategoryId: number;
}

export default ItemDto;
