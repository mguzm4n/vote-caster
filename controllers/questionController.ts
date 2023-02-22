import { type Request, type Response } from "express";
import { Collection } from "../models/Collection";

import * as questionService from '../services/questionService';

const questionFields = ['name'];

function isRequestComplete(object: any, fields: string[]) {
  for (let field of fields) {
    if (!object[field]) {
      return false;
    }
  }
  return true;
}

function isRequestListComplete(objects: any[], fields: string[]) {
  for (let object of objects) {
    if (!isRequestComplete(object, fields)) {
      return false;
    }
  }
  return true;
}

export async function createQuestions(req: Request, res: Response) {
  const foundCollection = await Collection.findById(req.params.collectionId);
  if (!foundCollection) {
    return res.status(404).send({ message: "Collection doesn't exists" });
  }

  const collectionId = foundCollection.id;
  
  if (!req.body.name) {
      return res.status(400).send({ message: "Missing fields for question"});
    }

  let responseBody = await questionService.createOne(req.body, collectionId);

  if (!responseBody) {
    return res.status(400).send({ message : "DB error, no data updated"});
  } 

  return res.send(responseBody);
}

export async function deleteQuestion(req: Request, res: Response) {
  const { collectionId, questionId } = req.params;
  try {
    await Collection.findByIdAndUpdate(collectionId, {
      $pull: {
        questions: { _id: questionId }
      }
    })
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Couldn't delete Question item from Collection" });
  }
}