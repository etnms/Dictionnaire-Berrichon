// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connectMongo";
import { Word } from "../../utils/model";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  
  connect();
  if (method === "GET") {
    try {
      const words = await Word.find({});
      const randomIndex = Math.floor(Math.random() * words.length);
      const selectedWord = words[randomIndex];
      res.status(200).json(selectedWord);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
