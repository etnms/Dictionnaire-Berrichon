import React from "react";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

type IndexContent = {
  title: string;
  paragraph: string;
  searchText: string;
};
const IndexContent: React.FC<IndexContent> = ({
  title,
  paragraph,
  searchText,
}) => {
  return (
    <div className="text-center dark:bg-gray-900 min-h-svh p-8">
      <Navbar />
      <h1 className="m-4 text-4xl text-center font-bold leading-none tracking-tight text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="mb-3 p-4 text-gray-500 dark:text-gray-400">{paragraph}</p>
      <p className="mb-3 p-4 text-gray-500 dark:text-gray-400">{searchText}</p>
      <SearchBar />
    </div>
  );
};

export default IndexContent;
