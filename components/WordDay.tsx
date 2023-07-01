import React from 'react';
import styles from "./WordDay.module.scss";
import { IWord } from '../utils/types';
import Spinner from './Spinner';
import WordDefinition from './WordDefinition';
import translatePOS from '../utils/translatePOS';

interface IWordOfTheDayProps {
    wordOfTheDay: IWord | null | undefined;
}

function WordDay(props: IWordOfTheDayProps) {
    const { wordOfTheDay } = props;


    return <div className={styles.container}>
        <h2>Mot du jour</h2>
        {wordOfTheDay === null || wordOfTheDay === undefined ? <Spinner height="60px" width="60px" border="4px solid #f3f3f3" borderTop="4px solid #607196" /> :

            <div className={styles["word-container"]}>
                <p className={styles.word}>{wordOfTheDay?.word} {wordOfTheDay?.pos ? `(${translatePOS(wordOfTheDay?.pos)})` : ""}</p>
                <p>Traduction: {wordOfTheDay?.translation}</p>
                <p>{wordOfTheDay?.definition ? `Définition: ${wordOfTheDay?.definition}` : null}</p>
            </div>
        }
    </div>
}


export default WordDay;