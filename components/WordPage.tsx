import React from "react";
import WordSeeAlso from "./WordSeeAlso";
import Link from "next/link";
import { SimilarWord, Entry } from "../utils/types";
import WordDefinition from "./WordDefinition";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

type WordPage = {
  entries: any;
  similarWords: SimilarWord[];
  languageDirection: string;
};

const WordPage: React.FC<WordPage> = ({
  entries,
  similarWords,
  languageDirection,
}) => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center gap-6">
        <SearchBar />
        <div className="w-4/5 flex flex-col items-center gap-6">
          {entries.words.length === 0 ? (
            <div className="mb-2">
              <p className="mb-3 p-2">
                Aucun résultat n&apos;a été trouvé pour ce mot.
              </p>
              {similarWords.length === 0 ? null : (
                <div className="flex flex-col items-center w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <p className="text-xl mb-2 dark:text-white">
                    Autres suggestions:
                  </p>
                  <ul className="">
                    {similarWords.map((word: SimilarWord) => (
                      <li
                        key={word._id}
                        className="py-1 ms-2 text-m text-gray-900 
                          hover:text-blue-700 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <Link href={`/${languageDirection}/${word.word}`}>
                          {word.word}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ul className="w-3/4">
              {entries.words.map((result: Entry) => (
                <WordDefinition
                  word={result.word}
                  translation={result.translation}
                  pos={result.pos}
                  gloss={result.gloss}
                  definition={result.definition}
                  key={result._id}
                />
              ))}
            </ul>
          )}
        </div>
        {entries.words.length === 0 ? null : (
          <WordSeeAlso
            similarWords={similarWords}
            languageDirection={languageDirection}
          />
        )}
      </main>
    </>
  );
};

export default WordPage;
