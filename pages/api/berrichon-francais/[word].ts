// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connectMongo";
import { Word } from "../../../utils/model";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  connect();
  if (method === "GET") {
    try {
      const words = await Word.find({word: req.query.word});
      res.status(200).json(words);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

