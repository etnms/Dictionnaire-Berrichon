import type { NextPage, GetServerSideProps } from "next";
import SearchBar from "../components/SearchBar";
import WordDay from "../components/WordDay";
import { useEffect, useState } from "react";
import { Entry } from "../utils/types";
import Navbar from "../components/Navbar";

type HomeProps = {
  serverWordOfTheDay: Entry;
};

const Home: NextPage<HomeProps> = ({ serverWordOfTheDay }) => {
  const [wordOfTheDay, setWordOfTheDay] = useState<Entry | null | undefined>(
    null
  );

  const today = new Date().toLocaleDateString();

  // Word of the day logic with localStorage caching
  useEffect(() => {
    // Check if date or local storage is empty
    const wordDayStorage: string | null = localStorage.getItem("wordDay");

    if (localStorage.getItem("date") !== today || wordDayStorage === null) {
      // Use the server-fetched word
      setWordOfTheDay(serverWordOfTheDay);
      localStorage.setItem("wordDay", JSON.stringify(serverWordOfTheDay));
      localStorage.setItem("date", today);
    } else {
      const object = JSON.parse(wordDayStorage);
      setWordOfTheDay(object);
    }
  }, [serverWordOfTheDay, today]);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 min-h-svh">
        <Navbar />
        <main className="bg-white dark:bg-gray-900 py-10 text-center flex flex-col gap-6 justify-center items-center">
          <h1 className="text-4xl dark:text-white">
            Dictionnaire berrichon en ligne
          </h1>
          <SearchBar />
          <WordDay wordOfTheDay={wordOfTheDay} />
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/word-day`);
  const serverWordOfTheDay = await res.json();

  return {
    props: {
      serverWordOfTheDay,
    },
  };
};

export default Home;
