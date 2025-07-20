/** @format */

import cors from "cors";
import express, { Request, Response } from "express";

import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import "./app/config/passport";
import { globalError } from "./app/middlewares/global.error";
import notFound from "./app/middlewares/not.found";
import { router } from "./app/routes";
const app = express();

app.use(
  expressSession({
    secret: "Your secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    massege: "Server is running...",
  });
});

app.use(globalError);

app.use(notFound);

export default app;
