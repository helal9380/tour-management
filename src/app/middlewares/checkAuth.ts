/** @format */

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppEror from "../errorHelpers/appError";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRest: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppEror(StatusCodes.BAD_REQUEST, "No Token recived");
      }

      const varifiedToken = verifyToken(
        accessToken,
        envVars.JWT_SECRET
      ) as JwtPayload;

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
