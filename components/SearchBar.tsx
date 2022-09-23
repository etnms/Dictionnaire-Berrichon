import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import ToggleSwitch from "./ToggleSwitch";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hook";

function SearchBar() {
  const router = useRouter();

  const [input, setInput] = useState<string>("");

  const lang = useAppSelector((state) => state.changeLang.value);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function searchWord() {
    if (lang === "ber") router.push(`/berrichon/${input}`);
    else if (lang === "fr") router.push(`/francais/${input}`);
    else return;
  }

  return (
    <div className={styles["wrapper-search"]}>
      <input className={styles["search-bar"]} name="main-input" onChange={(e) => handleInput(e)} />
      <ToggleSwitch />
      <button className={styles["btn-search"]} onClick={searchWord}>
        Chercher
      </button>
    </div>
  );
}

export default SearchBar;
