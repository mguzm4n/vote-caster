import { type Request, type Response } from "express";
import { Collection } from "../models/Collection";

export async function getAll(req:Request, res:Response) {
  return;
}

export async function getById(req:Request, res:Response) {
  const collectionId = req.params.collectionId;
  return res.send(await Collection.findById(collectionId));
}

export async function createCollection(req: Request, res: Response) {
  try {
    const collection = await Collection.create(req.body);
    return res.send(collection);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
}