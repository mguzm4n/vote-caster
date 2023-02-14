import express from "express";
import * as collectionController from "../controllers/collectionController";
import * as questionController from "../controllers/questionController";

export const router = express.Router();


// collection
router.post("/", collectionController.createCollection);
router.get("/", collectionController.getAll);
router.get("/:collectionId", collectionController.getById);

// questions
const questionURI = "/:collectionId";
router.post(`${questionURI}/questions`, questionController.createQuestions);


