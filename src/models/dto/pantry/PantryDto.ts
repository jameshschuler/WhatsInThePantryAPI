import { IsNotEmpty, IsString } from "class-validator";

export class PantryDto {
  @IsString()
  @IsNotEmpty({ message: "Must enter a pantry name." })
  public name: string;
}
