import type { NextPage } from "next";
import Head from "next/head";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header";
import WordDay from "../components/WordDay";
import { useEffect, useState } from "react";
import { IWord } from "../utils/types";

const Home: NextPage = () => {

  const [wordOfTheDay, setWordOfTheDay] = useState<IWord | null | undefined>(null);

  const today = new Date().toLocaleDateString();

  // Word of the day logic
  useEffect(() => {
    // Fetch the word of the day and update state
    async function fetchWordOfTheDay() {
      const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/word-day` as string);
      const word: IWord = await res.json();
      // Update state and localStorage
      setWordOfTheDay(word);
      localStorage.setItem("wordDay", JSON.stringify(word));
    }

    // Check if date or local storage is empty
   const wordDayStorage: string | null = localStorage.getItem("wordDay");

    if (localStorage.getItem("date") !== today || wordDayStorage === null) {
      localStorage.setItem("date", today);
      fetchWordOfTheDay();
    }
    else {
      const object = JSON.parse(wordDayStorage);
      setWordOfTheDay(object);
    }
  }, []);

  return (
    <div className={styles.page}>
      <Head>
        <title>Dictionaire Berrichon</title>
        <meta name="description" content="Homepage for the berrichon francais dictionnary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Title />
        <SearchBar />
        <WordDay wordOfTheDay={wordOfTheDay} />
      </main>
    </div>
  );
};

export default Home;
