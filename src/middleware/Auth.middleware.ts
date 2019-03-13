import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import RequestWithUser from "../dto/RequestWithUser";
import { User } from "../entity/User";
import { DataStoredInToken } from "../types/TokenData";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const secret = process.env.JWT_SECRET!;
    const token = req.headers.authorization.split(" ")[1];

    try {
      const verificationResponse = (await jwt.verify(
        token,
        secret
      )) as DataStoredInToken;

      const user = await User.findOne(verificationResponse.id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          message: "Invalid Token.",
          errors: ["Token may have expired."]
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Invalid Token.",
        errors: ["Token may have expired."]
      });
    }
  } else {
    res.status(400).json({
      message: "Missing Token.",
      errors: ["Missing Token."]
    });
  }
};

export default authMiddleware;
