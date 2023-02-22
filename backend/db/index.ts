import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING!);
    console.log("[DB] MongoDB Success connnection");
  } catch (error) {
    console.log("[DB] MongoDB Error connection:");
    console.error(error);
  }
}

export default connectToDb;
