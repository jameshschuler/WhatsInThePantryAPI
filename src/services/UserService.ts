import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import { RegisterDto } from "../dto/RegisterDto";
import { User } from "../entity/User";
import { ValidationException } from "../exceptions/ValidationException";

export class UserService {
  constructor() {}

  public async createUser(dto: RegisterDto): Promise<void> {
    const { username, firstName, lastName, password, email } = dto;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      isActive: true,
      createdDate: new Date(),
      loginFailureCount: 0
    });

    const errors = await validate(user);
    if (errors.length > 0) {
      let parsedErrors = [];
      for (let error of errors) {
        let messages = [];
        for (let i in error.constraints) {
          messages.push(error.constraints[i]);
        }

        parsedErrors.push({
          property: error.property,
          messages
        });
      }

      throw new ValidationException("Validation Error!", 400, parsedErrors);
    }

    await this.validateEmailUniqueness(email);
    await this.validateUsernameUniqueness(username);
    await this.validatePassword(password);

    await user.save();
  }

  /**
   * @description -
   * @param email
   */
  private async validateEmailUniqueness(email: string): Promise<void> {
    const user = await User.findOne({ email });
    if (user != null) {
      if (email === user.email) {
        throw new ValidationException("Validation Error!", 400, [
          {
            property: "Email",
            messages: [`Email (${email}) is already in use.`]
          }
        ]);
      }
    }
  }

  /**
   * @description -
   * @param username
   */
  private async validateUsernameUniqueness(username: string): Promise<void> {
    const user = await User.findOne({ username });
    if (user != null) {
      if (username === user.username) {
        throw new ValidationException("Validation Error!", 400, [
          {
            property: "Username",
            messages: [`Username (${username}) is already in use.`]
          }
        ]);
      }
    }
  }

  /**
   * @description -
   * @param password
   */
  private async validatePassword(password: string): Promise<void> {
    let messages = [];
    if (password.length < 12) {
      messages.push("Password must be at least 12 characters in length.");
    }

    if (password.search(/[a-z]/) < 0) {
      messages.push("Password must contain at least 1 lowercase letter.");
    }

    if (password.search(/[A-Z]/) < 0) {
      messages.push("Password must contain at least 1 uppercase letter.");
    }

    if (password.search(/[!@#\$%\^&\*]/) < 0) {
      messages.push("Password must contain at least 1 special character.");
    }

    if (messages.length > 0) {
      throw new ValidationException("Validation Error!", 400, [
        {
          property: "Password",
          messages
        }
      ]);
    }
  }
}
