import React from 'react';
import styles from "./WordDefinition.module.scss";

const WordDefinition = () => {
    return (
        <div className={styles.word}>
            <h1>Word</h1>
            <p>Translation</p>
            <p>Definition</p>
            <p>Part of speech</p>
            <p>Example</p>
        </div>
    );
};

export default WordDefinition;