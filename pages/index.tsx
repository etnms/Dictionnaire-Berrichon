import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dictionaire Berrichon</title>
        <meta name="description" content="Homepage for the berrichon francais dictionnary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <Title />
        <SearchBar />
      </main>
    </>
  );
};

export default Home;
