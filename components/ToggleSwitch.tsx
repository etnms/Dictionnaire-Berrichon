import React from "react";
import styles from "./ToggleSwitch.module.scss";

interface IToggleSwitch {
  lang: string;
  setLang: Function;
}
const ToggleSwitch = (props: IToggleSwitch) => {
  const {lang, setLang} = props;

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
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
