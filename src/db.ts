import mongoose from "mongoose";
import {MONGO_URI} from "./config/env.config";

const ConnectMongo = async (): Promise<mongoose.Mongoose> => {
  try {
      return await mongoose.connect(MONGO_URI);
  } catch (error) {
    throw error;
  }
};

export default ConnectMongo;