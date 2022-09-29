import React from "react";
import translatePOS from "../utils/translatePOS";
import styles from "./WordDefinition.module.scss";

interface IWordProps {
  word: string;
  translation: string;
  definition: string;
  pos: string;
}

const WordDefinition = (props: IWordProps) => {
  return (
    <div className={styles.word}>
      <h1>
        {props.word} ({translatePOS(props.pos)}){" "}
      </h1>
      <p>Traduction: {props.translation}</p>
      {props.definition === "" ? null : <p>Définition: {props.definition} </p>}
    </div>
  );
};

export default WordDefinition;
