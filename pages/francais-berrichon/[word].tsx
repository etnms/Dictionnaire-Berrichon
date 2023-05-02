import React from "react";
import SearchBar from "../../components/SearchBar";
import WordDefinition from "../../components/WordDefinition";
import { ISimilarWord, IWord } from "../../utils/types";
import styles from "./Word.module.scss";
import Header from "../../components/Header";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";

interface IWordResults {
  words: IWord[];
  similarWords: ISimilarWord[];
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
              <p className={styles["text-no-result"]}>Aucun résultat n&apos;a été trouvé pour ce mot.</p>
              {similarWords.length === 0 ? null :
                <div className={styles.suggestions}>
                  <p className={styles["text-other"]}>Autres suggestions:</p>
                  <ul className={styles.list}>{similarWords.map((word: ISimilarWord) =>
                    <li key={word._id} className={styles.link}>
                      <Link href={`/francais-berrichon/${word.word}`}>{word.word}</Link></li>)}</ul>
                </div>}
            </div>
          ) : (
            <ul className={styles["list-results"]}>
              {words.map((result: IWord) => (
                <WordDefinition 
                word={result.word} 
                translation={result.translation} 
                pos={result.pos} 
                gloss={result.gloss}
                definition={result.definition} 
                key={result._id} />
              ))}
            </ul>
          )}
        </div>
        {words.length === 0 ? null :
          <div className={styles["see-also"]}>
            <h2 className={styles.title}>Voir également</h2>
            <ul className={styles.list}>{similarWords.map((word: ISimilarWord) => <li key={word._id} className={styles.link}><Link href={`/francais-berrichon/${word.translation}`}>{word.translation}</Link></li>)}</ul>
          </div>}
      </main>
    </div>
  );
}

// Get props from server side rendering
export async function getServerSideProps(params: GetServerSidePropsContext) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/francais-berrichon/${params.query.word}` as string);
  const words = await res.json();

  const similarWordsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/similarWords?word=${params.query.word}&lang=francais-berrichon` as string);
  const similarWords = await similarWordsRes.json();
  // return props
  return {
    props: { words, similarWords },
  };
}
