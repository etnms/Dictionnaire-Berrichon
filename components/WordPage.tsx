import React, { useEffect, useState } from "react";
import WordSeeAlso from "./WordSeeAlso";
import Link from "next/link";
import { SimilarWord, Entry } from "../utils/types";
import WordDefinition from "./WordDefinition";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

type WordPage = {
  entries: any;
  languageDirection: string;
};

const WordPage: React.FC<WordPage> = ({ entries, languageDirection }) => {
  // Fetch similar word from the frontend to lighten backend load
  const [similarWords, setSimilarWords] = useState<SimilarWord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(isLoading);
    const fetchSimilarWords = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/similarWords?word=${
            entries.words[0]?.word || ""
          }&lang=berrichon-francais`
        );
        const data = await response.json();
        setSimilarWords(data); // Set the fetched similar words to state
      } catch (error) {
        //console.error("Failed to fetch similar words:", error);
      } finally {
        setIsLoading(false); // Stop loading state once data is fetched
      }
    };

    fetchSimilarWords();
  }, [entries.words]);

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-svh items-center gap-6 dark:bg-gray-900 p-2">
        <SearchBar />
        <div className="w-4/5 flex flex-col items-center gap-6">
          {entries.words.length === 0 ? (
            <div className="mb-2">
              <p className="mb-3 p-2">
                Aucun résultat n&apos;a été trouvé pour ce mot.
              </p>
              {isLoading ? (
                <p>
                  Chargement <Spinner />
                </p>
              ) : similarWords.length === 0 ? null : (
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
                  key={result.id}
                  dialect={result.dialect}
                />
              ))}
            </ul>
          )}
        </div>
        {isLoading ? (
          <p>
            <Spinner />
          </p>
        ) : entries.words.length === 0 ? null : (
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
