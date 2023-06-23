import React, { useState } from 'react';
import Header from '../components/Header';
import { IWord } from '../utils/types';
import WordDefinition from '../components/WordDefinition';

function RandomWords() {

    const [randomWords, setRandomWords] = useState<IWord[]>([]);

    async function fetchRandomWords() {
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/randomWordGeneration` as string);
        const words: IWord[] = await res.json();
        setRandomWords(words)
    }

    function renderWords() {
        return randomWords.map((word: IWord) => {
            return <WordDefinition word={word.word}
                translation={word.translation}
                pos={word.pos}
                gloss={word.gloss}
                definition={word.definition}
                key={word._id} />
        })

    }

    return (
        <div>
            <Header />
            <h1>List of random words</h1>
            <button onClick={() => fetchRandomWords()}>Fetch random words</button>
            <ul>
                {renderWords()}
            </ul>
        </div>
    );
}

export default RandomWords;