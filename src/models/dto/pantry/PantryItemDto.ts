import { IsNotEmpty } from "class-validator";

export class PantryItemDto {
  @IsNotEmpty({ message: "Must select an item." })
  public itemId: number;

  @IsNotEmpty({ message: "Must select a pantry." })
  public pantryId: number;

  @IsNotEmpty({ message: "Must enter a price." })
  public price: string;

  @IsNotEmpty({ message: "Must enter a unit." })
  public unit: string;

  @IsNotEmpty({ message: "Must select a item amount." })
  public itemAmountId: number;

  public itemLocationId: number;
}
