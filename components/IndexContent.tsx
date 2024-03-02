import React from "react";
import SearchBar from "./SearchBar";

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
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
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
