import React from "react";
import { SimilarWord, Word } from "../../utils/types";
import { GetServerSidePropsContext } from "next";
import WordPage from "../../components/WordPage";

interface IWordResults {
  words: Word[];
  similarWords: SimilarWord[];
}

export default function Word(props: IWordResults) {
  const { words, similarWords } = props;

  return (
    <WordPage
      words={words}
      similarWords={similarWords}
      languageDirection="berrichon-francais"
    />
  );
}

// Get props from server side rendering
export async function getServerSideProps(params: GetServerSidePropsContext) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/berrichon-francais/${params.query.word}` as string
  );
  const words = await res.json();
  const similarWordsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/similarWords?word=${params.query.word}&lang=berrichon-francais` as string
  );
  const similarWords = await similarWordsRes.json();
  // return props
  return {
    props: { words, similarWords },
  };
}
