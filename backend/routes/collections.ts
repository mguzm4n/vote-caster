import express from "express";
import * as collectionController from "../controllers/collectionController";
import * as questionController from "../controllers/questionController";
import * as alternativeController from "../controllers/alternativeController";

const collectionRouter = express.Router();


// collection
collectionRouter.post("/", collectionController.createCollection);
collectionRouter.delete("/:collectionId", collectionController.deleteCollection);

collectionRouter.get("/", collectionController.getAll);
collectionRouter.get("/:collectionId", collectionController.getById);

collectionRouter.put("/:collectionId/publish", collectionController.publishCollection);


// questions
const questionURI = "/:collectionId/questions";
collectionRouter.post(`${questionURI}`, questionController.createQuestions);
collectionRouter.delete(`${questionURI}/:questionId`, questionController.deleteQuestion);

// questions alternatives
const alternativeURI = questionURI + "/:questionId";
collectionRouter.post(`${alternativeURI}/alternatives`, alternativeController.createAlternative);
collectionRouter.put(`${alternativeURI}/alternatives`, alternativeController.updateAlternatives);
collectionRouter.delete(`${alternativeURI}/alternatives/:alternativeIndex`, alternativeController.deleteAlternative);


export default collectionRouter;