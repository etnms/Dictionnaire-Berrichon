import React from "react";
import Spinner from "./Spinner";

const Loader: React.FC = () => {
  return (
    <div className="h-svh dark:bg-gray-900 flex flex-col justify-center items-center">
      <Spinner />
      <p className="mb-3 text-4xl text-gray-700 dark:text-gray-400">
        Chargement
      </p>
    </div>
  );
};

export default Loader;
