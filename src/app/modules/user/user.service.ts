/** @format */

import { default as bcrypt, default as bcryptjs } from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppEror from "../../errorHelpers/appError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppEror(httpStatus.BAD_REQUEST, "User already exist!");
  }

  const passwordHash = await bcrypt.hash(
    password as string,
    Number(envVars.JWT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: passwordHash,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new AppEror(httpStatus.NOT_FOUND, "User not found!");
  }
  if (payload.role) {
    if (decodedToken.role === Role.USAR || decodedToken.role === Role.GUID) {
      throw new AppEror(httpStatus.FORBIDDEN, "You are an unauthorized");
    }
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppEror(httpStatus.FORBIDDEN, "You are an unauthorized!");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVarified) {
    if (decodedToken.role === Role.USAR || decodedToken.role === Role.GUID) {
      throw new AppEror(httpStatus.FORBIDDEN, "You are an unauthorized");
    }
  }
  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      Number(envVars.JWT_SALT_ROUND)
    );
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const getAllUser = async () => {
  const users = await User.find({});

  const total = await User.countDocuments();

  return {
    data: users,
    meta: {
      total,
    },
  };
};

export const UserService = {
  createUser,
  getAllUser,
  updateUser,
};
