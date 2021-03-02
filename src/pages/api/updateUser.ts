import { NowResponse, NowRequest } from "@vercel/node";

import { connectToDatabase } from "./accessUserData";

export default async (request: NowRequest, response: NowResponse) => {
  const {
    name,
    username,
    level,
    currentExperience,
    challengesCompleted,
  } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection("users");

  const updated = await collection
    .updateOne(
      { username: username },
      { $set: { level, currentExperience, challengesCompleted } }
    )
    .catch((err) => {
      return response.status(500).json({ message: err.message });
    });

  return response.status(200).json(updated);
};
