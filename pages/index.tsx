import type { NextPage } from "next";
import Head from "next/head";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import WordDay from "../components/WordDay";
import { useEffect, useState } from "react";
import { Entry } from "../utils/types";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState<Entry | null | undefined>(
    null
  );

  const today = new Date().toLocaleDateString();

  // Word of the day logic
  useEffect(() => {
    // Fetch the word of the day and update state
    async function fetchWordOfTheDay() {
      const res: Response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/word-day` as string
      );
      const word: Entry = await res.json();
      // Update state and localStorage
      setWordOfTheDay(word);
      localStorage.setItem("wordDay", JSON.stringify(word));
      localStorage.setItem("date", today);
    }

    // Check if date or local storage is empty
    const wordDayStorage: string | null = localStorage.getItem("wordDay");

    if (localStorage.getItem("date") !== today || wordDayStorage === null) {
      fetchWordOfTheDay();
    } else {
      const object = JSON.parse(wordDayStorage);
      setWordOfTheDay(object);
    }
  }, []);

  return (
    <div className="">
      <Head>
        <title>Dictionnaire Berrichon</title>
        <meta
          name="description"
          content="Homepage for the berrichon francais dictionnary"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <Navbar />
      <main className="py-10 text-center flex flex-col gap-12 justify-center items-center ">
        <Title />
        <SearchBar />
        <WordDay wordOfTheDay={wordOfTheDay} />
      </main>
    </div>
  );
};

export default Home;
