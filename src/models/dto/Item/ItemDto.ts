import { IsNotEmpty, IsString } from "class-validator";

class ItemDto {
  public id: number;

  @IsString()
  @IsNotEmpty({ message: "Must enter an item name." })
  public name: string;

  public price: string;

  public unit: string;

  public description: string;

  public itemLocationId?: number;

  @IsNotEmpty({ message: "Must select a default item amount." })
  public itemAmountId: number;

  public currentItemAmountId: number;

  @IsNotEmpty({ message: "Must select a default item category." })
  public itemCategoryId: number;
}

export default ItemDto;
