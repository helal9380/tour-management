/** @format */

import dotenv from "dotenv";

dotenv.config();

interface EnvVar {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
}

const loadEnv = (): EnvVar => {
  const requredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV"];
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
  };
};

export const envVars = loadEnv();
