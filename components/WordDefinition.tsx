import React from 'react';
import styles from "./WordDefinition.module.scss";

interface IWordProps {
    word: string,
    translation: string,
}

const WordDefinition = (props: IWordProps) => {
    return (
        <div className={styles.word}>
            <h1>{props.word}</h1>
            <p>Traduction: {props.translation}</p>
            <p>Definition: </p>
            <p>Part of speech</p>
        </div>
    );
};

export default WordDefinition;