import { type Request, type Response } from "express";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import { Collection, ICollection } from "../models/Collection";

export async function getAll(req:Request, res:Response) {
  return res.send(await Collection.find());
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
export async function deleteCollection(req: Request, res: Response) {
  try {
    await Collection.findByIdAndDelete(req.params.collectionId);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
} 

export async function publishCollection(req: Request, res: Response) {
  const { publish } = req.body;
  if (publish == null) {
    return res.status(400).send("A publish state to replace is needed");
  }
  const published = z.boolean().safeParse(publish);
  
  try {
    const collection: HydratedDocument<ICollection> | null = await Collection.findById(req.params.collectionId).exec();
    if (!collection) {
      return res.sendStatus(500);
    }

    if (collection.author !== req.session.user?.username) {
      return res.sendStatus(403);
    }

    collection.isPublished = published.success ? published.data : false;
    await collection.save();
    
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
} 