import React, { useEffect, useState } from "react";

interface IToggleSwitch {
  lang: string;
  setLang: Function;
}
const ToggleSwitch = (props: IToggleSwitch) => {
  const { lang, setLang } = props;

  //const [lang, setLang] = useState<string>("berrichon-francais");

  useEffect(() => {
    setLang(sessionStorage.getItem("lang") || "berrichon-francais");
  }, []);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    sessionStorage.setItem("lang", e.target.value);
    setLang(e.target.value);
  }

  return (
    <select
      className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
      onChange={handleSelect}
      value={lang}
    >
      <option value="berrichon-francais">Berrichon-Français</option>
      <option value="francais-berrichon">Français-Berrichon</option>
    </select>
  );
};

export default ToggleSwitch;
