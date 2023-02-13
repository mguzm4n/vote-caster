
import { router as userRouter } from "./routes/users";
import { router as collectionRouter } from "./routes/users";

import cors from 'cors';
import dotenv from 'dotenv';


import expressSession from "express-session";
import { v4 as uuidv4 } from 'uuid';

import express from 'express';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
};

import connectToDb from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(express.static('pet-images'));

app.use(
  cors({ 
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.use('/users', userRouter);
app.use('/collections', collectionRouter);

app.listen(port, () => {
  console.log(`[server]: running at port ${port}`);
  connectToDb();
});