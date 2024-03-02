import React from "react";
import SearchBar from "../../components/SearchBar";
import WordDefinition from "../../components/WordDefinition";
import { ISimilarWord, IWord } from "../../utils/types";
import Header from "../../components/Navbar";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";

interface IWordResults {
  words: IWord[];
  similarWords: ISimilarWord[];
}

export default function Word(props: IWordResults) {
  const { words, similarWords } = props;

  return (
    <div className="">
      <Header />
      <main className="">
        <SearchBar />
        <div className="">
          {words.length === 0 ? (
            <div>
              <p className="">
                Aucun résultat n&apos;a été trouvé pour ce mot.
              </p>
              {similarWords.length === 0 ? null : (
                <div className="">
                  <p className="">Autres suggestions:</p>
                  <ul className="">
                    {similarWords.map((word: ISimilarWord) => (
                      <li key={word._id} className="">
                        <Link href={`/berrichon-francais/${word.word}`}>
                          {word.word}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ul className="">
              {words.map((result: IWord) => (
                <WordDefinition
                  word={result.word}
                  translation={result.translation}
                  pos={result.pos}
                  gloss={result.gloss}
                  definition={result.definition}
                  key={result._id}
                />
              ))}
            </ul>
          )}
        </div>
        {words.length === 0 ? null : (
          <div className="">
            <h2 className="">Voir également</h2>
            <ul className="">
              {similarWords.map((word: ISimilarWord) => (
                <li key={word._id} className="">
                  <Link href={`/berrichon-francais/${word.word}`}>
                    {word.word}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
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
