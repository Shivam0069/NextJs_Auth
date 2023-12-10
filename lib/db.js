//MongoDb se Connect krne ke liye..

import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const id = process.env.DB_ID;
  const pass = process.env.DB_PASS;
  const client = await MongoClient.connect(
    `mongodb+srv://ShivamShivam:O3w8Rz2MIrTLHRL8@cluster0.zvxkxd5.mongodb.net/auth-demo?retryWrites=true&w=majority`
  );
  return client;
}
