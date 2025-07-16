/** @format */

import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const superAdmin = async () => {
  try {
    const isExistSuperAdmin = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isExistSuperAdmin) {
      console.log("super admin already exist!");
      return;
    }

    const hasPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.JWT_SALT_ROUND)
    );

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const payload: IUser = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hasPassword,
      role: Role.SUPER_ADMIN,
      auths: [authProvider],
      isVarified: true,
    };

    await User.create(payload);
  } catch (error) {
    console.log(error, "error form super admin");
  }
};
