import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';

export function requireLogin(req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    return next();
  }
  return res.sendStatus(401);
}

export async function login(req: Request, res: Response) {
  const { username, password: incomingPassword } = req.body;
  if (!username || !incomingPassword) {
    return res
      .status(400)
      .send({ msg: "Username or password may be missing" });
  }
  
  const userToLog = await User.findOne({
    username: username
  });

  if (!userToLog) {
    return res.status(400).send({ msg: "Invalid username or password" });
  }

  const acceptedLogin = bcrypt.compare(incomingPassword, userToLog.password);
  if (!acceptedLogin) {
    return res.status(400).send({ msg: "Invalid username or password" });
  }

  const { id, roles } = userToLog;
  req.session.user = { id, username, roles };
  return res.send(req.session.user);
}

export async function logout(req: Request, res: Response) {
  if (!req.session.user) {
    return res.status(401).send({ msg: 'No session stored' })
  }
  
  return req.session.destroy((err) => {
    res
      .clearCookie("connect.sid", { path: "/"})
      .send("Cleared session");
  });
}
