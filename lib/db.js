//MongoDb se Connect krne ke liye..

import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@cluster0.zvxkxd5.mongodb.net/auth-demo?retryWrites=true&w=majority`
  );
  return client;
}
