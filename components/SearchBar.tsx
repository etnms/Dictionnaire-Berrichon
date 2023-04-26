import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./SearchBar.module.scss";
import ToggleSwitch from "./ToggleSwitch";
import { useRouter } from "next/router";
import Tooltip from "./Tooltip";

function SearchBar() {

  const router = useRouter();

  const [lang, setLang] = useState<string>("berrichon-francais"); // default to main
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // limit for API call to help with debouncing
  const LIMIT = 10;

  // Ref to use to detect outside clicks
  const ref = useRef<HTMLDivElement>(null);

  // Handle input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function searchWord(value: string) {
    if (lang === "berrichon-francais" || lang === "francais-berrichon")
      router.push(`/${lang}/${value}`);
    else return;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      searchWord(input);
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
        .then((data) => { console.log(data); setSuggestions(data) });
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
    searchWord(value);
  }

   // Detect outside clicks
   useEffect(() => {
    // add event listener to detect clicks outside component
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // clicked outside component
        // Empty suggestion array to hide suggestions
        setSuggestions([]);
        console.log(ref.current);
        console.log(event.target);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={styles["wrapper-search"]} ref={ref}>
      <div className={styles["wrapper-input"]}>
        <input className={styles["search-bar"]} name="main-input" onChange={(e) => debouncedHandleInput(e)} onKeyDown={(e) => handleKeyDown(e)} autoComplete="off" />
        {memoizedSuggestions.length > 1 && ( // value of 1 to hide suggestion when the result is 0 or only 1 word, which is the final result
          <ul className={styles.suggestion}>
            {memoizedSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => fillOutSearchBar(suggestion)} className={styles["selected-suggestion"]}>{suggestion}</li>
            ))}
          </ul>
        )}
        <Tooltip />
      </div>
      <ToggleSwitch lang={lang} setLang={setLang} />
      <button className={styles["btn-search"]} onClick={() => searchWord(input)}>
        Chercher
      </button>

    </div>
  );
}

export default SearchBar;