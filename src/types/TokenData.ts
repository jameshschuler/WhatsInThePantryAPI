import jwt from "jsonwebtoken";
import { User } from "../entity/User";

export default interface TokenData {
  token: string;
  expiresIn: number;
}

interface DataStoredInToken {
  id: number;
  username: string;
}

export const createToken = (user: User) => {
  const expiresIn = 60 * 60; // an hour
  const secret = "MySuperSecretJWTPasscode"; //TODO: process.env.JWT_SECRET;
  const dataStoredInToken: DataStoredInToken = {
    id: user.id,
    username: user.username
  };
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn })
  };
};
