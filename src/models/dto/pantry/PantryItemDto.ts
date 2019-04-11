import { IsNotEmpty, IsString } from "class-validator";

export class PantryItemDto {
  @IsNotEmpty({ message: "Must select an item." })
  @IsString({ message: "Must select an item." })
  public itemId: any;

  @IsNotEmpty({ message: "Must select a pantry." })
  public pantryId: number;

  @IsNotEmpty({ message: "Must enter a price." })
  @IsString({ message: "Price must be in currency format." })
  public price: any;

  @IsNotEmpty({ message: "Must enter a unit." })
  public unit: string;

  @IsNotEmpty({ message: "Must select a item amount." })
  public itemAmountId: number;

  public itemLocationId: number;
}
