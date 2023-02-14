import { type Request, type Response } from "express";
import { Collection } from "../models/Collection";

import * as questionService from '../services/questionService';

const questionFields = ['author', ' multipleChoice', 'displaySymbol', 'alternatives'];

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

  let responseBody: any | null;
  
  if (Array.isArray(req.body)) {
    if (!isRequestListComplete(req.body, questionFields)) {
      return res.status(400).send({ message: "Missing fields for questions"});
    }
    responseBody = await questionService.createMany(req.body, collectionId);
  } else {
    if (!isRequestComplete(req.body, questionFields)) {
      return res.status(400).send({ message: "Missing fields for question"});
    }
    responseBody = await questionService.createOne(req.body, collectionId);
  }

  if (!responseBody) {
    return res.status(400).send({ message : "DB error, no data updated"});
  } 

  return res.send(responseBody);
}