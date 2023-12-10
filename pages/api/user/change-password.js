import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";
async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(405).send({ message: "Method not allowed" });
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  if (!oldPassword || !newPassword) {
    res.status(400).send({ message: "Missing password" });
    return;
  }
  const client = await connectToDatabase();
  const user = await client
    .db()
    .collection("users")
    .findOne({ email: userEmail });

  if (!user) {
    res.status(404).send({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const areEqual = await verifyPassword(oldPassword, currentPassword);
  if (!areEqual) {
    res.status(400).send({ message: "Incorrect password" });
    client.close();
    return;
  }
  const newHashedPassword = await hashPassword(newPassword);
  const result = await client
    .db()
    .collection("users")
    .updateOne({ email: userEmail }, { $set: { password: newHashedPassword } });
  if (result.modifiedCount === 0) {
    res.status(400).send({ message: "Failed to update password" });
    client.close();
    return;
  }
  res.status(200).send({ message: "Password updated" });
  client.close();
  return;
}
export default handler;
