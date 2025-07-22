/** @format */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { envVars } from "../../config/env";
import AppEror from "../../errorHelpers/appError";
import { catchAsync } from "../../utils/catchAsync";
import { getUserToken } from "../../utils/getUserToken";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setToken";
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new AppEror(500, info.message));
      }

      const userToken = await getUserToken(user);

      const { password: pas, ...rest } = user.toObject();

      setAuthCookie(res, userToken);
      sendResponse(res, {
        success: true,
        message: "User login successfully",
        data: {
          accessToken: userToken.accessToken,
          refreshToken: userToken.refreshToken,
          user: rest,
        },
        statusCode: httpStatus.CREATED,
      });
    })(req, res, next);
  }
);
const getRefreshToken = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppEror(
        httpStatus.BAD_REQUEST,
        "No refresh token reciev fron cookies!"
      );
    }
    const loginInfo = await AuthServices.getRefreshToken(refreshToken);
    setAuthCookie(res, loginInfo);
    sendResponse(res, {
      success: true,
      message: "User login successfully",
      data: loginInfo,
      statusCode: httpStatus.CREATED,
    });
  }
);
const logout = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    sendResponse(res, {
      success: true,
      message: "User logout successfully",
      data: null,
      statusCode: httpStatus.OK,
    });
  }
);
const resetPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;

    await AuthServices.resetPassword(
      oldPassword,
      newPassword,
      decodedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password Changed Successfully",
      data: null,
    });
  }
);
const googleCallback = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }
    if (!user) {
      throw new AppEror(httpStatus.BAD_REQUEST, "User not found!");
    }
    const tokenInfo = getUserToken(user);
    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);

export const AuthController = {
  credentialsLogin,
  getRefreshToken,
  logout,
  resetPassword,
  googleCallback,
};
