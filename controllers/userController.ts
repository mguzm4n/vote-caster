import { Request, Response } from "express";
import { User } from "../db/models";
import bcrypt from 'bcrypt';

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