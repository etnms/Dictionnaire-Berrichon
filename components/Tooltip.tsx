import React from "react";
import styles from "./Tooltip.module.css";

function Tooltip() {
  return (
    <div className={styles.tooltip}>
      <span className={styles["tooltip-placeholder"]}>?</span>
      <span className={styles["tooltip-text"]}>
        Le berrichon n'a ni orthographe officiel ni convention orthographique.
        Si vous avez l'orthographe d'un mot en tête et que vous ne le trouvez
        pas dans le dictionnaire, il se peut simplement qu'il soit épelé
        differemment dans notre base de donnée. Nous sommes en train de
        travailler sur une solution basé sur l'orthographe des mots pour essayer
        de parer à cette éventualité.
      </span>
    </div>
  );
}

export default Tooltip;
