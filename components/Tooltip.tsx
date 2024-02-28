import React from "react";
import styles from "./Tooltip.module.css";

const Tooltip: React.FC = () => {
  return (
    <div className={styles.tooltip}>
      <span className={styles["tooltip-placeholder"]}>?</span>
      <span className={styles["tooltip-text"]}>
        Le berrichon n'a ni orthographe officiel ni convention orthographique.
        Si vous avez l'orthographe d'un mot en tête et que vous ne le trouvez
        pas dans le dictionnaire, il se peut simplement qu'il soit épelé
        differemment dans la base de donnée. Vous pouvez envoyer un message à ce
        sujet sur la page contact.
      </span>
    </div>
  );
};

export default Tooltip;
