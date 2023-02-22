import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import { Collection } from "../models/Collection";

export async function createUser(req: Request, res: Response) {
  const { 
    firstName,
    lastName,
    username,
    password,
    email,
  } = req.body;
  if (!(firstName && lastName && username && password && email)) {
    return res.status(400).send({ 'message': 'Fields are missing' });
  }

  const foundDuplicate = await User.findOne({ username: username }).exec();
  if (foundDuplicate) {
    return res.status(400).send({ 'message': `Username '${username}' value is taken` });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.send(newUser);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: 'Could not register any user. Try again.' })
  }
}

export async function getCollections(req: Request, res: Response) {
  const username = req.params.username;
  if (username !== req.session.user?.username) {
    return res.sendStatus(403);
  }

  return res.send(
    await Collection.find({ author: username }).exec()
  );
}