import React from 'react';
import WordDefinition from '../../components/WordDefinition';
import styles from "./Word.module.scss";

function Word() {
    return (
        <div className={styles.page}>
            <WordDefinition/>
        </div>
    );
}

export default Word;