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
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const selectedSuggestionRef = useRef<HTMLLIElement>(null);

  // limit for API call to help with debouncing
  const LIMIT = 10;

  // Ref to use to detect outside clicks
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(sessionStorage.getItem("lang") || "berrichon-francais");
  }, [])

  // Handle input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function searchWord(value: string) {
    if (lang === "berrichon-francais" || lang === "francais-berrichon")
      router.push(`/${lang}/${value}`);
    else return;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedSuggestionIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : memoizedSuggestions.length - 1
      );
      scrollToSelectedSuggestion();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedSuggestionIndex(prevIndex =>
        prevIndex < memoizedSuggestions.length - 1 ? prevIndex + 1 : 0
      );
      scrollToSelectedSuggestion();
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedSuggestionIndex !== -1) {
        searchWord(memoizedSuggestions[selectedSuggestionIndex]);
      } else {
        setInput(event.target.value);
      }
    }
  }

  function scrollToSelectedSuggestion() {
    if (selectedSuggestionRef.current) {
      const container = selectedSuggestionRef.current.parentElement;
      const selectedSuggestion = selectedSuggestionRef.current;
      const containerTop = container!.getBoundingClientRect().top;
      const suggestionTop = selectedSuggestion.getBoundingClientRect().top;
      const scrollTop = suggestionTop - containerTop;

      // Handle scrolling to the first suggestion when at the end and pressing ArrowDown
      console.log(selectedSuggestionIndex);
      if (selectedSuggestionIndex === 0) {
        container!.scrollTop = 0;
      } else {
        container!.scrollTop = scrollTop;
      }
    }
  }

  // deboucing function to reduce load
  function debounce(func: Function, wait: number, delay: number) {
    let timeout: NodeJS.Timeout;
    let counter = 0;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
        counter++;
      }, wait);
      if (counter < delay / wait) {
        setTimeout(() => {
          func(...args);
          counter++;
        }, delay);
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
      fetch(`/api/suggestions?word=${searchQuery}&lang=${lang}`)
        .then((response) => response.json())
        .then((data) => { setSuggestions(data) });
    }, 500, LIMIT);
    debouncedFetch(input);
  }, [input]);

  // Memoize results
  const memoizedSuggestions = useMemo(() => suggestions, [suggestions]);

  // Debounce input
  const debouncedHandleInput = debounce(handleInput, 350, 100);

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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  // functions to handle different scenarios to display the search bar or not
  function renderSearchSuggestions() {
    if (memoizedSuggestions[0] === input && memoizedSuggestions.length === 1)
      return null;
    else if (input.length < 3)// && memoizedSuggestions.length === 0
      return null;
    else if (memoizedSuggestions.length > 0) {
      return <ul className={styles.suggestion}>
        {memoizedSuggestions.map((suggestion, index) => (
          <li ref={index === selectedSuggestionIndex ? selectedSuggestionRef : null}
            key={index} onClick={() => fillOutSearchBar(suggestion)}
            onMouseEnter={() => setSelectedSuggestionIndex(index)} // Add this line
            onMouseLeave={() => setSelectedSuggestionIndex(-1)} className={`${styles["selected-suggestion"]} ${index === selectedSuggestionIndex ? styles.selected : ""
              }`}>{suggestion}</li>
        ))}
      </ul>
    }

    else
      return null
  }

  return (
    <div className={styles["wrapper-search"]} ref={ref}>
      <div className={styles["wrapper-input"]}>
        <input className={styles["search-bar"]} name="main-input" onChange={(e) => debouncedHandleInput(e)} onKeyDown={(e) => handleKeyDown(e)} autoComplete="off" />
        {renderSearchSuggestions()}
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