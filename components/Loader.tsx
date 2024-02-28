import React from "react";
import Spinner from "./Spinner";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Spinner />
      <p className={styles.text}>Chargement</p>
    </div>
  );
};

export default Loader;
