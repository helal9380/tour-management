/** @format */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("conected to DB");

    server = app.listen(envVars.PORT, () => {
      console.log(`tour management running on post ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// error handleing

process.on("unhandledRejection", (error) => {
  console.log("unhandleRejection error", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException error", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM error");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
