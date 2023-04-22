import React, { useEffect, useState } from 'react';
import styles from "./WordDay.module.scss";
import { IWord } from '../utils/types';
import Loader from './Loader';


interface IWordOfTheDayProps {
    wordOfTheDay: IWord | null | undefined;
}

function WordDay(props: IWordOfTheDayProps) {
    const { wordOfTheDay } = props;

    if (wordOfTheDay === null) { return <Loader /> } else{
        return <div className={styles.container}>
            <h2>Mot du jour: {wordOfTheDay?.word} {wordOfTheDay?.pos ? `(${wordOfTheDay?.pos})` : ""}</h2>
            <p>Traduction: {wordOfTheDay?.translation}</p>
            <p>{wordOfTheDay?.definition ? `Définition: ${wordOfTheDay?.definition}` : null}</p>
        </div>
    }
}

export default WordDay;