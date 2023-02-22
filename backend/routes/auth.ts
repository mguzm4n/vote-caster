import express from "express";
import * as authController from "../controllers/authController";

const authRouter = express.Router();

// collection
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/validate", () => console.log("TODO"));

export default authRouter;