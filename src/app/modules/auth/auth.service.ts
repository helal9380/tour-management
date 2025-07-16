/** @format */

import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import AppEror from "../../errorHelpers/appError";
import { generateToken } from "../../utils/jwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist?.password as string
  );

  if (!isUserExist) {
    throw new AppEror(httpStatus.BAD_REQUEST, "Email does't exist");
  }
  if (!isPasswordMatched) {
    throw new AppEror(httpStatus.BAD_GATEWAY, "Incorrect password");
  }

  const jwtPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
    userId: isUserExist._id,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  credentialsLogin,
};
