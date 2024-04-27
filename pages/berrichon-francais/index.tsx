import React from "react";
import IndexContent from "../../components/IndexContent";

const index: React.FC = () => {
  return (
    <IndexContent
      title="Dictionnaire berrichon en ligne"
      paragraph="Le dictionnaire berrichon a pour but de regrouper le lexique du
      Berrichon et de fournir une traduction en français. Ce dictionnaire est
      en constante évolution et de nouveaux mots sont ajoutés jour après jour. La recherche se fait dans les deux directions: berrichon-français et français-berrichon."
      searchText="Vous pouvez commencer à chercher en tapant un mot dans la barrer de
        recherche ci-dessous."
    />
  );
};

export default index;
