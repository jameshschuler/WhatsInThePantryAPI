import { IsNotEmpty, IsString } from "class-validator";

class CreateEditItemDto {
  public id: number;

  @IsString({ message: "Name must be letters only." })
  @IsNotEmpty({ message: "Must enter an item name." })
  public name: string;

  public description: string;

  public defaultItemLocationId?: number;

  @IsNotEmpty({ message: "Must select a default item amount." })
  public defaultItemAmountId: number;

  @IsNotEmpty({ message: "Must select a default item category." })
  public itemCategoryId: number;
}

export default CreateEditItemDto;
