
import userRouter from "./routes/users";
import collectionRouter from "./routes/collections";
import authRouter from "./routes/auth";
import cors from 'cors';
import dotenv from 'dotenv';

import initializeMongoSession from 'connect-mongodb-session';

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

var MongoDBStore = initializeMongoSession(expressSession);
const mongoDBStore = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION_STRING!,
  databaseName: 'vote-cast',
  collection: 'mySessions',
});

app.use(expressSession({
  genid: () => uuidv4(),
  secret: process.env.SESSION_SECRET!,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
  },
  store: mongoDBStore,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: false,
  saveUninitialized: false,
}));

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
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`[server]: running at port ${port}`);
  connectToDb();
});