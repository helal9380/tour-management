/** @format */

import { NextFunction, Request, Response } from "express";
import httpStatus, { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppEror from "../errorHelpers/appError";
import { IsActive } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRest: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppEror(StatusCodes.BAD_REQUEST, "No Token recived");
      }

      const varifiedToken = verifyToken(
        accessToken,
        envVars.JWT_SECRET
      ) as JwtPayload;
      const isUserExist = await User.findOne({ email: varifiedToken.email });

      if (!isUserExist) {
        throw new AppEror(httpStatus.BAD_REQUEST, "User does't exist");
      }
      if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppEror(
          httpStatus.BAD_REQUEST,
          `User is ${isUserExist.isActive}`
        );
      }

      if (isUserExist.isDeleted) {
        throw new AppEror(httpStatus.BAD_REQUEST, "User is deleted already!");
      }

      if (!authRest.includes(varifiedToken.role)) {
        throw new AppEror(
          StatusCodes.BAD_REQUEST,
          "You are not permited to view this rout."
        );
      }

      req.user = varifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
