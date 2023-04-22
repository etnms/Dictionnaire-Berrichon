import React from "react";
import SearchBar from "../../components/SearchBar";
import WordDefinition from "../../components/WordDefinition";
import { IWord } from "../../utils/types";
import styles from "./Word.module.scss";

interface IWordResults {
  words: Array<IWord>;
  similarWords: Array<IWord>;
}

// To do : get styles and values from berrichon-francais and update this
// Alternative: find how to do some DRY for two similar pages

export default function Word(props: IWordResults) {
  const { words, similarWords } = props;

  return (
    <div className={styles.page}>
      <SearchBar />
      <div className={styles.results}>
        {words.length === 0 ? (
          <p>Aucun résultat n&apos;a été trouvé pour ce mot.</p>
        ) : (
          <ul>
            {words.map((result: IWord) => (
              <WordDefinition word={result.word} translation={result.translation} pos={result.pos} definition={result.definition} key={result._id} />
            ))}
          </ul>
        )}
      </div>
      <div className={styles["see-also"]}>
        <h2>Voir également</h2>
        <ul>{similarWords.map((word: IWord) => <li key={word._id}>{word.word}</li>)}</ul>
      </div>
    </div>
  );
}

// Get props from server side rendering
export async function getServerSideProps(params: any) {
  const res = await fetch(`${process.env.api}/api/francais-berrichon/${params.query.word}` as string);
  const words = await res.json();

  const similarWordsRes =  await fetch(`${process.env.api}/api/similarWords/${params.query.word}` as string);
  const similarWords = await similarWordsRes.json();
  // return props
  return {
    props: { words, similarWords },
  };
}
