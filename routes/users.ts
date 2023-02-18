import express from "express";
import * as userController from "../controllers/userController";
import { requireLogin } from "../controllers/authController";

const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send("HI!!"));

userRouter.post("/", userController.createUser);
userRouter.get(
  "/:username/collections", 
  requireLogin,
  userController.getCollections
);

export default userRouter;