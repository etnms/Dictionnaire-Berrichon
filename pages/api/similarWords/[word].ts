import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connectMongo";
import { Word } from "../../../utils/model";
import natural from 'natural';

// Calculate the Levenshtein distance between two strings
function levenshteinDistance(a: string, b: string) {
  return natural.LevenshteinDistance(a, b);
}

// Find similar words to the user's input
async function findSimilarWords(input: string) {
  const words = await Word.find({});
  const similarWords = words
    .map(word => ({ word, distance: levenshteinDistance(word.word, input) }))
    .filter(({ distance }) => distance <= 2) // Only return words with a distance of 2 or less
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 11) // Sort by distance
    .map(({ word }) => word);

  return similarWords;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  connect();
  if (method === "GET") {
    try {
      const words = await findSimilarWords(req.query.word as string);
      //Remove the input word from the user from the array
      const similarWordsTrimmed = words.filter((word) => word.word !== req.query.word);
      res.status(200).json(similarWordsTrimmed);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}