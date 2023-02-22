import { Request, Response } from "express";
import { Collection } from "../models/Collection";

export async function updateAlternative(req: Request, res: Response) {
  return;
}

export async function updateAlternatives(req: Request, res: Response) {
  const { 
    collectionId, 
    questionId
  } = req.params;

  const alternatives = req.body.alternatives;

  try {
    await Collection.findByIdAndUpdate({
      _id: collectionId,
      "questions._id": questionId
    }, {
      $set: {
        "questions.$.alternatives": alternatives
      }
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}

export async function createAlternative(req: Request, res: Response) {
  const { 
    collectionId, 
    questionId
  } = req.params;

  const alternative = req.body.alternative;

  try {
    await Collection.updateOne({
      _id: collectionId,
      "questions._id": questionId
    }, {
      $push: {
        "questions.$.alternatives": alternative
      }
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}

export async function deleteAlternative(req: Request, res: Response) {
  const { 
    collectionId, 
    questionId,
    alternativeIndex
  } = req.params;
  const idx = +alternativeIndex;
  try {
    await Collection.updateOne({
      _id: collectionId,
      "questions._id": questionId
    }, { 
      $unset: { ["questions.$.alternatives." + idx.toString()]: 1 } 
    });

    await Collection.updateOne({
      _id: collectionId,
      "questions._id": questionId
    }, { 
      $pullAll: { "questions.$.alternatives": [null]  } 
    });
    
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}