/** @format */

import { Router } from "express";
import { UserContorller } from "./user.controller";

const router = Router();

router.post("/register", UserContorller.createUser);
router.get("/all-users", UserContorller.getAllUsers);

export const UserRoutes = router;
