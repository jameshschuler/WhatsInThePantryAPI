import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: "Must enter a username." })
  public username: string;

  @IsString()
  @IsNotEmpty({ message: "Must enter a username. " })
  @IsEmail(undefined, { message: "Must be a valid email." })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: "Must enter a first name." })
  public firstName: string;

  @IsString()
  @IsNotEmpty({ message: "Must enter a last name." })
  public lastName: string;

  @IsString()
  @IsNotEmpty({ message: "Must enter a password." })
  public password: string;
}
