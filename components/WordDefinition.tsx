import React from "react";
import translatePOS from "../utils/translatePOS";
import styles from "./WordDefinition.module.scss";

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
  
  function checkGloss(value: string) {
    switch(value) {
      case "M":
        return " masculin";
      case "F":
        return " féminin";
      default:
        return "";
    }
  }

  return (
    <li className={styles.word}>
      <h1>
        {props.word} {props.pos === "" ? null : `(${translatePOS(props.pos)}${checkGloss(props.gloss)})`}
      </h1>
      <p>Traduction: {props.translation}</p>
      {props.definition === "" ? null : <p>Définition: {props.definition} </p>}
    </li>
  );
};

export default WordDefinition;
