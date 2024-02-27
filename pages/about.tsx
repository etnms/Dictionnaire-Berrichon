import React, { useState } from "react";
import Header from "../components/Navbar";
import styles from "../styles/About.module.scss";
import MainTab from "../components/AboutTabs/MainTab";
import PronunciationTab from "../components/AboutTabs/PronunciationTab";
import OtherTab from "../components/AboutTabs/OtherTab";

function About() {
  const [indexTab, changeIndexTab] = useState<number>(0); // default to first index

  function displayTab() {
    switch (indexTab) {
      case 0:
        return MainTab();
      case 1:
        return PronunciationTab();
      case 2:
        return OtherTab();
      default:
        return MainTab();
    }
  }

  function handleBtn(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) {
    // get previous active btn if any
    const prevActive: HTMLButtonElement | null = document.querySelector(
      `.${styles["btn-active"]}`
    );
    prevActive?.classList.remove(styles["btn-active"]);

    // change tab
    changeIndexTab(index);

    // add active style
    e.currentTarget.classList.add(styles["btn-active"]);
  }
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.navbar}>
          <button
            onClick={(e) => handleBtn(e, 0)}
            className={styles["navbar-btn"]}
          >
            Le projet
          </button>
          <button
            onClick={(e) => handleBtn(e, 1)}
            className={styles["navbar-btn"]}
          >
            Notes sur la prononciation
          </button>
          <button
            onClick={(e) => handleBtn(e, 2)}
            className={styles["navbar-btn"]}
          >
            Autres
          </button>
        </div>
        <div className={styles.content}>{displayTab()}</div>
      </main>
    </div>
  );
}

export default About;
