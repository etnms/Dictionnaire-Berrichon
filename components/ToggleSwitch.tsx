import React from "react";
import styles from "./ToggleSwitch.module.scss";

const ToggleSwitch = () => {
  return (
    <div>
      <select className={styles.select}>
        <option>Francais-Berrichon</option>
        <option>Berrichon-Francais</option>
      </select>
    </div>
  );
};

export default ToggleSwitch;
