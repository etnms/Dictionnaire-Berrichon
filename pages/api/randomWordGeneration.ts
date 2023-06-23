import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connectMongo";
import { Word } from "../../utils/model";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  connect();
  if (method === "GET") {
    try {
      const words = await Word.find({});
     
      let randomWords = [];
      for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomWords.push(words[randomIndex]);
      }
      res.status(200).json(randomWords);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
