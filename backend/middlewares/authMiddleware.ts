import bcrypt from 'bcrypt';

import { Request, Response, NextFunction} from "express";
import { z } from 'zod';

const encryptPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch(e) {
    console.log(e);
    return null;
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const parsedPwd = z.string().min(8).max(71).safeParse(req.body.password);
  if (!parsedPwd.success) {
    return res.status(400).send({ errFields: parsedPwd.error });
  }

  const processedPassword = await encryptPassword(parsedPwd.data);

  if (!processedPassword) {
    return res.status(400).send("Can't register new user");
  }
  
  req.body.password = processedPassword;
  next();
}

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).send({ msg: "Can't find session" });
  }
}

export const checkSession= async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    next();
  } else {
    return res.status(401).send({ msg: "Session already set" });
  }
}