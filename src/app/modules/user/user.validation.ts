/** @format */

import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "min length 2" })
    .max(50, { message: "Name too long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])/, {
      message: "Password must be one uppercase and lowercase",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "Password must be on special charector",
    })
    .regex(/^(?=.*(?=.*\d))/, { message: "Password must be one number." }),

  phone: z
    .string({ invalid_type_error: "Phone number must be string" })
    .regex(/^(?:\+8801|01)[0-9]{9}$/, {
      message:
        "Must be a valid Bangladeshi phone number (e.g., +8801XXXXXXXXX or 01XXXXXXXXX)",
    })
    .optional(),
  address: z
    .string({ invalid_type_error: "Address must be string." })
    .max(200, {
      message: "Address can not exist over the 200 characters.",
    })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "min length 2" })
    .max(50, { message: "Name too long" })
    .optional(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])/, {
      message: "Password must be one uppercase and lowercase",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "Password must be on special charector",
    })
    .regex(/^(?=.*(?=.*\d))/, { message: "Password must be one number." })
    .optional(),

  phone: z
    .string({ invalid_type_error: "Phone number must be string" })
    .regex(/^(?:\+8801|01)[0-9]{9}$/, {
      message:
        "Must be a valid Bangladeshi phone number (e.g., +8801XXXXXXXXX or 01XXXXXXXXX)",
    })
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
  isVarified: z
    .boolean({ invalid_type_error: "isVarified must be true or false" })
    .optional(),
  address: z
    .string({ invalid_type_error: "Address must be string." })
    .max(200, {
      message: "Address can not exist over the 200 characters.",
    })
    .optional(),
});
