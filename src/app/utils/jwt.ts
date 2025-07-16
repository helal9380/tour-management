/** @format */

import Jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const accessToken = Jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
  return accessToken;
};

export const verifyToken = (accessToken: string, secret: string) => {
  const verifiedToken = Jwt.verify(accessToken, secret);
  return verifiedToken;
};
