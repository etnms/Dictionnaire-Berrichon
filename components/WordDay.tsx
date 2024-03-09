import React from "react";
import { Word } from "../utils/types";
import Spinner from "./Spinner";
import translatePOS from "../utils/translatePOS";
import Link from "next/link";
import checkGloss from "../utils/checkGloss";

type WordOfTheDayProps = {
  wordOfTheDay: Word | null | undefined;
};

const WordDay: React.FC<WordOfTheDayProps> = (props) => {
  const { wordOfTheDay } = props;

  const pageLink = `Voir page de « ${wordOfTheDay?.word} »`;
  return (
    <div className="w-6/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Mot du jour
      </h2>
      {wordOfTheDay === null || wordOfTheDay === undefined ? (
        <Spinner />
      ) : (
        <div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {wordOfTheDay?.word}{" "}
            {wordOfTheDay?.pos
              ? `(${translatePOS(wordOfTheDay?.pos)}${checkGloss(
                  wordOfTheDay?.gloss
                )})`
              : ""}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Traduction: {wordOfTheDay?.translation}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {wordOfTheDay?.definition
              ? `Définition: ${wordOfTheDay?.definition}`
              : null}
          </p>
          <div>
            <Link
              href={`/berrichon-francais/${wordOfTheDay?.word}`}
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 rounded-lg hover:text-blue-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {pageLink}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordDay;
