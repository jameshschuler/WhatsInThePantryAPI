import bcrypt from "bcryptjs";
import { Validator } from "class-validator";
import jwt from "jsonwebtoken";
import LoggedInDto from "../models//dto/LoggedInDto";
import { User } from "../models/entity/User";
import { ValidationException } from "../utils/exceptions/ValidationException";
import { DataStoredInToken } from "../utils/interfaces";

export class AccountService {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async login(
    usernameOrEmail: string,
    password: string
  ): Promise<LoggedInDto | null> {
    this.validateLogin(usernameOrEmail, password);

    let user = await this.getUserByUsernameOrEmail(usernameOrEmail);

    if (user) {
      const ONE_HOUR = 60 * 60 * 1000; /* ms */
      if (
        user.lockoutDate &&
        Date.now() - user.lockoutDate.getTime() < ONE_HOUR
      ) {
        throw new ValidationException("Login Error!", 400, [
          "Invalid credentials.",
          "Account has been locked for 1 hour."
        ]);
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        user.loginFailureCount = 0;
        user.lockoutDate = new Date("1900-01-01 00:00:00:000");
        user.lastLogin = new Date();

        await user.save();

        return {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          token: this.createToken(user)
        };
      }

      await this.processLoginFailed(user);
      return null;
    } else {
      throw new ValidationException("Login Error!", 400, [
        "Invalid credentials."
      ]);
    }
  }

  /**
   *
   * @param user
   */
  createToken(user: User) {
    const expiresIn = 60 * 60 * 24; // a day
    const secret = process.env.JWT_SECRET!;
    const dataStoredInToken: DataStoredInToken = {
      id: user.id,
      username: user.username
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  /**
   *
   * @param user
   */
  private async processLoginFailed(user: User): Promise<void> {
    if (user.loginFailureCount < 5) {
      user.loginFailureCount += 1;
      await user.save();

      throw new ValidationException("Login Error!", 400, [
        "Invalid credentials."
      ]);
    } else {
      user.lockoutDate = new Date();
      await user.save();

      throw new ValidationException("Login Error!", 400, [
        "Invalid credentials.",
        "Account has been locked for 1 hour."
      ]);
    }
  }

  /**
   *
   * @param usernameOrEmail
   */
  private async getUserByUsernameOrEmail(
    usernameOrEmail: string
  ): Promise<User | undefined> {
    let user = null;
    if (this.validator.isEmail(usernameOrEmail)) {
      user = await User.findOne({ email: usernameOrEmail });
    } else {
      user = await User.findOne({ username: usernameOrEmail });
    }

    return user;
  }

  /**
   *
   * @param usernameOrEmail
   * @param password
   */
  private validateLogin(usernameOrEmail: string, password: string): void {
    if (
      this.validator.isEmpty(usernameOrEmail) ||
      this.validator.isEmpty(password)
    ) {
      throw new ValidationException("Login Error!", 400, [
        "Must enter a username or email and password."
      ]);
    }
  }
}
