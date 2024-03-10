import React from "react";
import { EntryResults } from "../../utils/types";
import { GetServerSidePropsContext } from "next";
import WordPage from "../../components/WordPage";

export default function Word(props: EntryResults) {
  const { entries, similarWords } = props;

  return (
    <WordPage
      entries={entries}
      similarWords={similarWords}
      languageDirection="francais-berrichon"
    />
  );
}

// Get props from server side rendering
export async function getServerSideProps(params: GetServerSidePropsContext) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/francais-berrichon/${params.query.word}` as string
  );
  const entries = await res.json();

  const similarWordsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/similarWords?word=${params.query.word}&lang=francais-berrichon` as string
  );
  const similarWords = await similarWordsRes.json();
  // return props
  return {
    props: { entries, similarWords },
  };
}
