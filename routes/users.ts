import express from "express";
import * as userController from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send("HI!!"));

userRouter.post("/", userController.createUser);

export default userRouter;