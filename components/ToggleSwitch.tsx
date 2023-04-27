import React, { useEffect, useState } from "react";
import styles from "./ToggleSwitch.module.scss";

interface IToggleSwitch {
  lang: string;
  setLang: Function;
}
const ToggleSwitch = (props: IToggleSwitch) => {

  const {lang, setLang} = props;

  //const [lang, setLang] = useState<string>("berrichon-francais");

  useEffect(() => {
    setLang(sessionStorage.getItem("lang") || "berrichon-francais");
  }, [])

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) { 
    sessionStorage.setItem("lang", e.target.value);
    setLang(e.target.value);
  }

  return (
      <select className={styles.select} onChange={handleSelect} value={lang} >
        <option value="berrichon-francais">Berrichon-Français</option>
        <option value="francais-berrichon">Français-Berrichon</option>
      </select>
  );
};

export default ToggleSwitch;
