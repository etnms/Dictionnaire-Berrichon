import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connectMongo";
import { Word } from "../../utils/model";
import natural from 'natural';


interface IWordDB {
    word: string;
    translation: string;
    definition: string;
    example: string;
    pos: string;
}

// Calculate the Levenshtein distance between two strings
function levenshteinDistance(a: string, b: string) {
    return natural.LevenshteinDistance(a, b);
}

// Find similar words to the user's input
async function findSimilarWords(input: string, lang: string) {
    const words = await Word.find({});
    const isBerrichonToFrancais = lang === "berrichon-francais";
    const isFrancaisToBerrichon = lang === "francais-berrichon";

    if (!isBerrichonToFrancais && !isFrancaisToBerrichon) {
        return null;
    }

    const similarityFunc = isBerrichonToFrancais
        ? (word: any) => levenshteinDistance(word.word, input) // Get word for berrichon-fr input
        : (word: any) => levenshteinDistance(word.translation, input); // Get word (translation) for fr-berrichon input

    const similarWords = words
        .map((word) => ({ word, distance: similarityFunc(word) }))
        .filter(({ distance }) => distance <= 2)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 11)
        .map(({ word }) => word);

    return similarWords;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    connect();
    if (method === "GET") {
        try {
            const words: any | null = await findSimilarWords(req.query.word as string, req.query.lang as string);
            //Remove the input word from the user from the array
            const similarWordsTrimmed = words.filter((word: any) => word.word !== req.query.word);
            res.status(200).json(similarWordsTrimmed);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}