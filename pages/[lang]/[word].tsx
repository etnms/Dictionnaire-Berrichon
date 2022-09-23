import React from "react";
import { useAppSelector } from "../../app/hook";
import SearchBar from "../../components/SearchBar";
import WordDefinition from "../../components/WordDefinition";
import { IWord } from "../../utils/types";
import styles from "./Word.module.scss";

interface IWordResults {
  words: Array<IWord>;
}

export default function Word(props: IWordResults) {
  const { words } = props;

  return (
    <div className={styles.page}>
      <SearchBar/>
      <div>
        <ul>
          {words.map((result: IWord) => (
            <WordDefinition word={result.word} translation={result.translation} key={result._id} />
          ))}
        </ul>
      </div>
      <div>
        <span> Voir egalement</span>
        <ul>
          list of other words
        </ul>
      </div>
    </div>
  );
}

// Get props from server side rendering
export async function getServerSideProps(params: any) {

  const res = await fetch(`http://localhost:3000/api/${params.query.lang}/${params.query.word}` as string);
  const words = await res.json();

  // return props
  return {
    props: { words },
  };
}
