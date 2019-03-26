import { IsNotEmpty, IsString } from "class-validator";

class CreateEditPantryDto {
  @IsString()
  @IsNotEmpty({ message: "Must enter a pantry name." })
  public name: string;
}

export default CreateEditPantryDto;
