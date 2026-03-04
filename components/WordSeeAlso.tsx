import Link from "next/link";
import React from "react";
import { SimilarWord } from "../utils/types";

type WordSeeAlso = {
  similarWords: SimilarWord[];
  languageDirection: string;
};
const WordSeeAlso: React.FC<WordSeeAlso> = ({
  similarWords,
  languageDirection,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 w-2/4 p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-3xl font-bold dark:text-white">Voir également</h2>
      <ul className="">
        {similarWords.map((word: SimilarWord) => (
          <li
            key={word._id}
            className="py-2 px-4 ms-2 text-m rounded-lg text-gray-900 hover:text-blue-700 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {/* Link for see also is always "berrichon-francais" for the language direction.
            It only shows berrichon words as they are the focus. If using "languageDirection" it
            leads to errors trying to point to the French word pages with Berrichon words. */}
            <Link href={`/berrichon-francais/${word.word}`}>{word.word}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordSeeAlso;
