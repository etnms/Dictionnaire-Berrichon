import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connectMongo";
import { Word } from "../../utils/model";
import natural from "natural";
import NodeCache from "node-cache";

interface IWordDb {
    word: string;
    translation: string;
    _id?: number;
}

const cache = new NodeCache();

// Calculate the Levenshtein distance between two strings
function levenshteinDistance(a: string, b: string) {
    return natural.LevenshteinDistance(a, b);
}

// Find similar words to the user's input
async function findSimilarWords(input: string, lang: string): Promise<IWordDb[] | null> {

    // Caching to improve performance of the function
    const cacheKey: string = `findSimilarWords_${lang}_${input}`;
    const cachedResult: any = cache.get(cacheKey);
    if (cachedResult) {
        return cachedResult;
    }

    const words: IWordDb[] = await Word.find({}).select("word translation");
    const isBerrichonToFrancais: boolean = lang === "berrichon-francais";
    const isFrancaisToBerrichon: boolean = lang === "francais-berrichon";

    if (!isBerrichonToFrancais && !isFrancaisToBerrichon) {
        return null;
    }

    const similarityFunc = isBerrichonToFrancais
        ? (word: IWordDb) => levenshteinDistance(word.word, input) // Get word for berrichon-fr input
        : (word: IWordDb) => levenshteinDistance(word.translation, input); // Get word (translation) for fr-berrichon input

    const similarWords = words
        .map((word) => ({ word, distance: similarityFunc(word) }))
        .filter(({ distance }) => distance <= 2)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 11) // limtis the number of results sent back to the front-end
        .map(({ word }) => word);

    cache.set(cacheKey, similarWords);
    return similarWords;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    const wordQuery: string = req.query.word as string;
    const langQuery: string = req.query.lang as string;
    connect();
    if (method === "GET") {
        try {
            const words: IWordDb[] | null = await findSimilarWords(wordQuery, langQuery);
            if (words === null) {
                return res.status(200).json([]);
            }
            //Remove the input word from the user from the array
            const similarWordsTrimmed = words.filter((word: IWordDb) => word.word !== req.query.word);
            res.status(200).json(similarWordsTrimmed);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}