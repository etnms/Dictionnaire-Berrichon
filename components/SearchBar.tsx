import React, { useState, useEffect, useMemo } from "react";
import styles from "./SearchBar.module.scss";
import ToggleSwitch from "./ToggleSwitch";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hook";

function SearchBar() {

  const router = useRouter();

  const [input, setInput] = useState<string>("");
  const lang = useAppSelector((state) => state.changeLang.value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // limit for API call to help with debouncing
  const LIMIT = 10;

  // Handle input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function searchWord() {
    if (lang === "berrichon-francais" || lang === "francais-berrichon")
      router.push(`/${lang}/${input}`);
    else return;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      searchWord();
    }
  }

  // deboucing function to reduce load
  function debounce(func: Function, wait: number, limit: number) {
    let timeout: NodeJS.Timeout;
    let counter = 0;
    return (...args: any) => {
      clearTimeout(timeout);
      if (counter < limit) {
        timeout = setTimeout(() => {
          func(...args);
          counter++;
        }, wait);
      }
    };
  }

  // API call to suggestion based on input
  useEffect(() => {
    // limit API call to only input of 3 characters and more 
    if (input === "" || input.length < 3) {
      setSuggestions([]);
      return
    };

    // Call backend API here to fetch suggestions
    // pass the input value as a query parameter to filter the suggestions
    const debouncedFetch = debounce((searchQuery: string) => {
      fetch(`/api/suggestions?word=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data));
    }, 500, LIMIT);
    debouncedFetch(input);
  }, [input]);

  // Memoize results
  const memoizedSuggestions = useMemo(() => suggestions, [suggestions]);

  // Debounce input
  const debouncedHandleInput = debounce(handleInput, 350, LIMIT);

  // Fill out search bar when clicking on a suggestion
  function fillOutSearchBar(value: string) {
    (document.querySelector("input[name='main-input']") as HTMLInputElement).value = value;
    setInput(value);
    // Reset suggestions
    setSuggestions([]);
    //Click allows for direct search
    searchWord();
  }

  return (
    <div className={styles["wrapper-search"]}>
      <input className={styles["search-bar"]} name="main-input" onChange={(e) => debouncedHandleInput(e)} onKeyDown={(e) => handleKeyDown(e)} autoComplete="off" />
      {memoizedSuggestions.length > 1 && ( // value of 1 to hide suggestion when the result is 0 or only 1 word, which is the final result
        <ul className={styles.suggestion}>
          {memoizedSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => fillOutSearchBar(suggestion)} className={styles["selected-suggestion"]}>{suggestion}</li>
          ))}
        </ul>
      )}
      <ToggleSwitch />
      <button className={styles["btn-search"]} onClick={searchWord}>
        Chercher
      </button>

    </div>
  );
}

export default SearchBar;