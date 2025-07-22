/** @format */

import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppEror from "../errorHelpers/appError";

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `Something went wrong!! ${err.message} from global error`;

  if (err.code === 11000) {
    const errorArray = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = `${errorArray[1]} already exist!`;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ObjectId.  Please provide a currect Id";
  } else if (err instanceof AppEror) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
