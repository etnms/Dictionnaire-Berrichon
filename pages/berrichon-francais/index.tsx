import React from "react";
import SearchBar from "../../components/SearchBar";
import styles from"./Index.module.scss";

function index() {

  return (
    <div className={styles.page}>
        <h1>Dictionnaire français-berrichon</h1>
      <p className={styles.paragraph}>
        Le dictionnaire français-berrichon a pour but de regrouper le lexique du Berrichon et de fournir une
        traduction en français. Ce dictionnaire est en constante évolution et de nouveaux mots sont ajoutés jour après jour.
      </p>
      <p className={styles.paragraph}>
        Vous pouvez commencer à chercher en tapant un mot dans la barrer de recherche ci-dessous. 
      </p>
      <SearchBar />
    </div>
  );
}

export default index;
