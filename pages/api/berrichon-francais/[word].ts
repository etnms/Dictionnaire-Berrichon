// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connectMongo";
import { Word } from "../../../utils/model";
//import natural from "natural";

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

// levenshtein approach to get similar words; is used in similar words
/*
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  connect();
  if (method === "GET") {
    try {
      const words = await Word.find({});

      const searchWord:any = req.query.word;
      const threshold = 1; // Maximum edit distance allowed

      // Find words that are within the given edit distance
      const results = words.filter((word) => {
        const distance = natural.LevenshteinDistance(searchWord, word.word);
        return distance <= threshold;
      });

      res.status(200).json(results);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
*/

