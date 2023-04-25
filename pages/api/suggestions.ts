import type { NextApiRequest, NextApiResponse } from "next";
import { Word } from "../../utils/model";
import { connect } from "../../utils/connectMongo";

// Suggestion function that looks through DB using a regex expression but limits results to 10 to not overload the page/users
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    connect();
    if (method === "GET") {
        try {
            // Regex to get results for words that start with same letters as input + limit results to only 10 words. 
            const words = await Word.find({ word: { $regex: '^' + req.query.word } }).limit(10);
            const selectWordOnly = words.map((word) => word.word);
            res.status(200).json(selectWordOnly);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}