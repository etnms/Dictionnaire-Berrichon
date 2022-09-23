import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import styles from "./ToggleSwitch.module.scss";
import { changeLang } from "../features/changeLangSlice";

const ToggleSwitch = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.changeLang.value);
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeLang(e.target.value));
  }

  return (
    <div>
      <select className={styles.select} onChange={handleSelect} value={lang} >
        <option value="berrichon-francais">Berrichon-Français</option>
        <option value="francais-berrichon">Français-Berrichon</option>
      </select>
    </div>
  );
};

export default ToggleSwitch;
