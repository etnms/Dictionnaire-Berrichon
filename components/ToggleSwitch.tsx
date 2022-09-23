import React from "react";
import { useAppDispatch } from "../app/hook";
import styles from "./ToggleSwitch.module.scss";
import {changeLang} from "../features/changeLangSlice";


const ToggleSwitch = () => {

  const dispatch = useAppDispatch();
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    dispatch(changeLang(e.target.value));
  }

  return (
    <div>
      <select className={styles.select} onChange={handleSelect}>
        <option value="fr">Français-Berrichon</option>
        <option value="ber">Berrichon-Français</option>
      </select>
    </div>
  );
};

export default ToggleSwitch;
