import React from "react";
import { EntryResults } from "../../utils/types";
import { GetServerSidePropsContext } from "next";
import WordPage from "../../components/WordPage";

export default function Word(props: EntryResults) {
  const { entries } = props;
  return <WordPage entries={entries} languageDirection="berrichon-francais" />;
}

// Get props from server side rendering
export async function getServerSideProps(params: GetServerSidePropsContext) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/berrichon-francais/${params.query.word}` as string
  );

  // If empty result (404 on api), send empty entries but similar words
  if (res.status === 404) {
    return {
      props: {
        entries: { words: [] },
      },
    };
    // Otherwise get the entries and return props
  } else {
    const entries = await res.json();
    // return props
    return {
      props: { entries },
    };
  }
}
