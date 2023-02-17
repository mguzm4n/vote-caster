import express from "express";
import * as collectionController from "../controllers/collectionController";
import * as questionController from "../controllers/questionController";

const collectionRouter = express.Router();


// collection
collectionRouter.post("/", collectionController.createCollection);
collectionRouter.get("/", collectionController.getAll);
collectionRouter.get("/:collectionId", collectionController.getById);


// questions
const questionURI = "/:collectionId";
collectionRouter.post(`${questionURI}/questions`, questionController.createQuestions);


export default collectionRouter;