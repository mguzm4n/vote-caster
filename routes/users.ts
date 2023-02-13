import express from "express";
import * as userController from "../controllers/userController";
export const router = express.Router();

router.get("/", (req, res) => res.send("HI!!"));

router.post("/", userController.createUser);
