import type { NextApiRequest, NextApiResponse } from "next";
import { Word } from "../../utils/model";
import { connect } from "../../utils/connectMongo";

type ISuggestionRes = string[];

interface ISuggestionWordDb {
    word?: string;
    translation?: string;
    _id?: number;
}

// Suggestion function that looks through DB using a regex expression but limits results to 10 to not overload the page/users
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    connect();

    const { method } = req;
    const { lang, word } = req.query;

    if (method === "GET") {
        try {
            if (!lang || !word) {
                // Return an error response if lang or word query parameters are missing
                res.status(400).json({ error: 'Missing query parameters' });
                return;
            }

            const query = lang === 'berrichon-francais'
                ? { word: { $regex: '^' + word } }
                : lang === 'francais-berrichon'
                    ? { translation: { $regex: '^' + word } }
                    : null;

            if (!query) {
                // Return an error response if lang query parameter is invalid
                res.status(400).json({ error: 'Invalid lang query parameter' });
                return;
            }

            const words: ISuggestionWordDb[] = await Word.find(query)
            .select(lang === 'berrichon-francais' ? 'word' : 'translation')
            //.collation({ locale: "fr", strength: 1 })
            .limit(10);

            const uniqueWords: string[] = [];
            const suggestions: ISuggestionRes = [];

            words.forEach(({ word, translation }) => {
                const suggestion = lang === 'berrichon-francais' ? word : translation;
                if (suggestion && !uniqueWords.includes(suggestion)) {
                    uniqueWords.push(suggestion);
                    suggestions.push(suggestion);
                  }
            });
            suggestions.sort();
            res.status(200).json(suggestions);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}