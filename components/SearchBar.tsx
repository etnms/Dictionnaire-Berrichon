import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./SearchBar.module.css";
import ToggleSwitch from "./ToggleSwitch";
import { useRouter } from "next/router";

const SearchBar: React.FC = () => {
  const router = useRouter();

  // Lang and input variables
  const [lang, setLang] = useState<string>("berrichon-francais"); // default to main
  const [input, setInput] = useState<string>("");

  // Suggestion variables
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const selectedSuggestionRef = useRef<HTMLLIElement>(null);

  // Search bar ref variable to detect outside clicks
  const searchBarRef = useRef<HTMLDivElement>(null);

  // useEffect to apply the detect click outside logic
  useEffect(() => {
    // Add event listener to detect clicks outside component
    const handleClickOutside = (event: MouseEvent) => {
      // When clicked outside
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        // Empty suggestion array to hide suggestions
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Placeholder text that changes depending on screen size
  const [searchBarPlaceholder, setSearchBarPlaceholder] = useState<string>(
    "Rechercher dans le dictionnaire"
  );

  // Use effect to detect screen size and update placeholder text
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 550) {
        setSearchBarPlaceholder("Rechercher");
      }
    }
  }, []);

  // limit for API call to help with debouncing
  const LIMIT = 10;
  const DEBOUNCETIMEOUT = 500;

  // Ref to use to detect outside clicks
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(sessionStorage.getItem("lang") || "berrichon-francais");
  }, []);

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
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const newIndex: number =
        event.key === "ArrowUp"
          ? (selectedSuggestionIndex - 1 + memoizedSuggestions.length) %
            memoizedSuggestions.length
          : (selectedSuggestionIndex + 1) % memoizedSuggestions.length;
      setSelectedSuggestionIndex(newIndex);
      scrollToSelectedSuggestion(newIndex);
      (
        document.querySelector("input[name='main-input']") as HTMLInputElement
      ).value = suggestions[newIndex];
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedSuggestionIndex !== -1) {
        searchWord(memoizedSuggestions[selectedSuggestionIndex]);
      } else {
        setInput(event.target.value);
      }
    }
  }

  function scrollToSelectedSuggestion(index: number) {
    if (selectedSuggestionRef.current) {
      const container = selectedSuggestionRef.current.parentElement;
      const selectedSuggestion = selectedSuggestionRef.current;
      const containerTop = container!.getBoundingClientRect().top;
      const suggestionTop = selectedSuggestion.getBoundingClientRect().top;
      const scrollTop = suggestionTop - containerTop;

      if (index === 0) {
        container!.scrollTop = 0;
      } else if (index === memoizedSuggestions.length - 1) {
        container!.scrollTop = container!.scrollHeight;
      } else if (selectedSuggestion) {
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
      return;
    }
    // Call backend API here to fetch suggestions
    // pass the input value as a query parameter to filter the suggestions
    const debouncedFetch = debounce(
      (searchQuery: string) => {
        fetch(
          `${process.env.NEXT_PUBLIC_API}/api/suggestions?word=${searchQuery}&lang=${lang}`
        )
          .then((response) => response.json())
          .then((data) => {
            setSuggestions(data.suggestions);
          });
      },
      DEBOUNCETIMEOUT,
      LIMIT
    );
    debouncedFetch(input);
  }, [input]);

  // Memoize results
  const memoizedSuggestions: string[] = useMemo(
    () => suggestions,
    [suggestions]
  );

  // Debounce input
  const debouncedHandleInput = debounce(handleInput, 350, 100);

  // Fill out search bar when clicking on a suggestion
  function fillOutSearchBar(value: string) {
    (
      document.querySelector("input[name='main-input']") as HTMLInputElement
    ).value = value;
    setInput(value);
    // Reset suggestions
    setSelectedSuggestionIndex(-1);
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

    document.addEventListener("mousedown", handleClickOutside);

    // cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  // functions to handle different scenarios to display the search bar or not
  function renderSearchSuggestions() {
    if (memoizedSuggestions[0] === input && memoizedSuggestions.length === 1)
      return null;
    else if (input.length < 3)
      // && memoizedSuggestions.length === 0
      return null;
    else if (memoizedSuggestions.length > 0) {
      return (
        <ul
          className={`${styles.suggestion}
        text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50`}
        >
          {memoizedSuggestions.map((suggestion, index) => (
            <li
              ref={
                index === selectedSuggestionIndex ? selectedSuggestionRef : null
              }
              key={index}
              onClick={() => fillOutSearchBar(suggestion)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)} // Add this line
              onMouseLeave={() => setSelectedSuggestionIndex(-1)}
              className={`${styles["selected-suggestion"]} ${
                index === selectedSuggestionIndex ? styles.selected : ""
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      );
    } else return null;
  }

  return (
    <div
      className="max-w-md w-3/4 mx-auto flex flex-col gap-3"
      ref={searchBarRef}
    >
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="main-input"
          onChange={(e) => debouncedHandleInput(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          autoComplete="off"
          placeholder={searchBarPlaceholder}
        />
        {renderSearchSuggestions()}
        <button
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => searchWord(input)}
        >
          Chercher
        </button>
      </div>
      <ToggleSwitch lang={lang} setLang={setLang} />
    </div>
  );
};

export default SearchBar;
