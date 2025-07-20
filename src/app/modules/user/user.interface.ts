/** @format */

import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USAR = "USER",
  GUID = "GUID",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  picture?: string;
  phone?: string;
  address?: string;
  isDeleted?: string;
  isActive?: IsActive;
  isVarified?: boolean;
  role: Role;
  auths: IAuthProvider[];
  bookingIds?: Types.ObjectId[];
  guidIds?: Types.ObjectId[];
}
