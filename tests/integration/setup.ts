import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.disconnect(); 
  await mongoose.connect(uri);
};

export const closeDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
