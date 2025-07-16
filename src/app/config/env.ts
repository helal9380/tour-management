/** @format */

import dotenv from "dotenv";

dotenv.config();

interface EnvVar {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_SECRET: string;
  JWT_SALT_ROUND: string;
  JWT_ACCESS_EXPIRES: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
}

const loadEnv = (): EnvVar => {
  const requredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_SECRET",
    "JWT_SALT_ROUND",
    "JWT_ACCESS_EXPIRES",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
  ];
  requredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing requred env variables ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_SALT_ROUND: process.env.JWT_SALT_ROUND as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
  };
};

export const envVars = loadEnv();
