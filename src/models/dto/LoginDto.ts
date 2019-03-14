import { IsNotEmpty, IsString } from "class-validator";

class LoginDto {
  @IsString()
  @IsNotEmpty({ message: "Must enter a valid email or username." })
  public usernameOrEmail: string;

  @IsString({})
  @IsNotEmpty({ message: "Must enter a password." })
  public password: string;
}

export default LoginDto;
