import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import RequestWithUser from "../../models/dto/RequestWithUser";
import User from "../../models/entity/User";
import { DataStoredInToken } from "../interfaces";

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

      const user = await User.findOne({
        where: {
          id: verificationResponse.id,
          username: verificationResponse.username
        },
        relations: ["items", "pantryUsers"]
      });

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({
          message: "Invalid Token.",
          errors: ["Token may have expired."]
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "Invalid Token.",
        errors: ["Token may have expired."]
      });
    }
  } else {
    res.status(401).json({
      message: "Missing Token.",
      errors: ["Missing Token."]
    });
  }
};

export default authMiddleware;
