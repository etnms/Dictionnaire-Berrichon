import React from "react";
import translatePOS from "../utils/translatePOS";
import checkGloss from "../utils/checkGloss";

interface IWordProps {
  word: string;
  translation: string;
  definition: string;
  pos: string;
  gloss: string;
}

const WordDefinition = (props: IWordProps) => {
  // Simple check gloss that returns the type of noun if known
  // no need to return other glosses since the dictionary already focuses on basic parts of speech
  // This is solely based on values in the database and structure of this dictionary and the
  // check gloss function can be adapted to the needs of the dictionary

  return (
    <li className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.word}{" "}
        {props.pos === ""
          ? null
          : `(${translatePOS(props.pos)}${checkGloss(props.gloss)})`}
      </h1>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Traduction: {props.translation}
      </p>
      {props.definition === "" ? null : (
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Définition: {props.definition}{" "}
        </p>
      )}
    </li>
  );
};

export default WordDefinition;
