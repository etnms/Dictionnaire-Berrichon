import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import ToggleSwitch from "./ToggleSwitch";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hook";
import Spinner from "./Spinner";

function SearchBar() {
  const router = useRouter();

  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const lang = useAppSelector((state) => state.changeLang.value);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function searchWord() {
    setIsLoading(true);
    if (lang === "berrichon-francais") {
      router.push(`/${lang}/${input}`);
      setIsLoading(false);
      console.log("oops");
    } else if (lang === "francais-berrichon") {
      router.push(`/${lang}/${input}`);
      setIsLoading(false);
    } else return;
  }

  return (
    <div className={styles["wrapper-search"]}>
      <input className={styles["search-bar"]} name="main-input" onChange={(e) => handleInput(e)} />
      <ToggleSwitch />
      <button className={styles["btn-search"]} onClick={searchWord}>
        {isLoading ? <Spinner /> : "Chercher"}
      </button>
    </div>
  );
}

export default SearchBar;
