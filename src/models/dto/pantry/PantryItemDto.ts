import { IsNotEmpty } from "class-validator";

export class PantryItemDto {
  @IsNotEmpty({ message: "Must select an item." })
  public itemId?: number;

  @IsNotEmpty({ message: "Must select a pantry." })
  public pantryId?: number;
}
