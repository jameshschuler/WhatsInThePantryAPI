import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import { RegisterDto } from "../dto/RegisterDto";
import { ValidationError } from "../dto/ValidationError";
import { User } from "../entity/User";

export class UserService {
  constructor() {}

  public async createUser(dto: RegisterDto) {
    const { username, firstName, lastName, password, email } = dto;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      isActive: true
    });

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new ValidationError("Validation Error!", errors);
    }

    await user.save();
  }
}
