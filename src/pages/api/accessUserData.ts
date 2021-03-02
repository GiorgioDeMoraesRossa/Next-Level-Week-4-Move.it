/* 
Pega o acess token do github e salva o usuário no mongoDb (caso não exista) 
retorna as informações mais atualizadas do usuário
*/

import { NowRequest, NowResponse } from "@vercel/node";
import { MongoClient, Db } from "mongodb";
import url from "url";
import axios from "axios";

let cachedDb: Db = null;

export async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async (request: NowRequest, response: NowResponse) => {
  const { code } = request.body;

  // pega informações do github
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
  };

  // troca codigo por access Token
  const accessToken = await axios
    .post("https://github.com/login/oauth/access_token", data)
    .then((res) =>
      res.data ? res.data.split("token=")[1].split("&")[0] : null
    );

  if (!accessToken) {
    console.log("ERR: ACESS TOKEN");
    return response
      .status(500)
      .json({ message: "Problema com o acess token do github" });
  }
  // requisição de dados do usuário
  const userData = await axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return response.status(500).json({ message: err.message });
    });

  // verifica se já existe usuário
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection("users");

  const user = await collection.findOne({ username: userData.login });

  // se não: salvar no mongoDb e retorna-lo
  if (!user) {
    const inserted = await collection
      .insertOne({
        name: userData.name != null ? userData.name : userData.login,
        username: userData.login,
        currentExperience: 0,
        level: 1,
        challengesCompleted: 0,
      })
      .catch((err) => {
        return response.status(500).json({ message: err.message });
      });

    return response.status(201).json({
      name: userData.name != null ? userData.name : userData.login,
      username: userData.login,
    });
  }

  // se existe: retorna-lo
  return response.status(201).json(user);
};
