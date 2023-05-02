import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connectMongo";
import { Word } from "../../../utils/model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  connect();
  if (method === "GET") {
    try {
      const words = await Word.find({translation: req.query.word}).select("word translation definition example pos gloss");
      res.status(200).json(words);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

