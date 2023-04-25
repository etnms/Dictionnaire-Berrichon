import React from "react";
import SearchBar from "../../components/SearchBar";
import WordDefinition from "../../components/WordDefinition";
import { IWord } from "../../utils/types";
import styles from "./Word.module.scss";
import Header from "../../components/Header";
import Link from "next/link";

interface IWordResults {
  words: Array<IWord>;
  similarWords: Array<IWord>;
}

export default function Word(props: IWordResults) {
  const { words, similarWords } = props;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>

        <SearchBar />
        <div className={styles.results}>
          {words.length === 0 ? (
            <div>
              <p>Aucun résultat n&apos;a été trouvé pour ce mot.</p>
              <p>Voulez-vous dire:</p>
              <ul className={styles.list}>{similarWords.map((word: IWord) => <li key={word._id} className={styles.link}><Link href={`/berrichon-francais/${word.word}`}>{word.word}</Link></li>)}</ul>
            </div>
          ) : (
            <ul className={styles["list-results"]}>
              {words.map((result: IWord) => (
                <WordDefinition word={result.word} translation={result.translation} pos={result.pos} definition={result.definition} key={result._id} />
              ))}
            </ul>
          )}
        </div>
        {words.length === 0 ? null :
          <div className={styles["see-also"]}>
            <h2 className={styles.title}>Voir également</h2>
            <ul className={styles.list}>{similarWords.map((word: IWord) => <li key={word._id} className={styles.link}><Link href={`/berrichon-francais/${word.word}`}>{word.word}</Link></li>)}</ul>
          </div>}
      </main>
    </div>
  );
}

// Get props from server side rendering
export async function getServerSideProps(params: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/berrichon-francais/${params.query.word}` as string);
  const words = await res.json();
  const similarWordsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/similarWords/${params.query.word}` as string);
  const similarWords = await similarWordsRes.json();
  // return props
  return {
    props: { words, similarWords },
  };
}
