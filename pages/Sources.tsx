import React from "react";

import Header from "../components/Navbar";
import Reference from "../components/Reference";

const Sources: React.FC = () => {
  return (
    <div className="">
      <Header />
      <main className="">
        <h1 className="">Sources et références</h1>
        <p className="">
          Ce dictionnaire berrichon en ligne est le résultat d'un travail de
          recherche et de regroupement de sources. Vous pouvez donc accéder
          ci-dessous à la liste des travaux au coeur de ce dictionnaire.{" "}
        </p>
        <ul className="">
          <Reference
            author="Gilbert, J.-P."
            date="2006"
            title="Petit dictionnaire berrichon"
            link="http://www.gilblog.fr/petit-dictionnaire-berricho/index.html"
          />
          <Reference
            author="Gilbert, J.-P."
            date="2022"
            title="Histoires Vraies, Sornettes et Menteries du Haut Berry"
            editor="Alyce Lyner éditions"
          />
          <Reference
            author="Pinglaut, M."
            date="2018"
            title="Dictionnaire français-berrichon: J&#8217;causons comme Molière
            (Vol. 1)"
            editor="La Bouchure"
          />
          <Reference
            author="Pinglaut, M."
            date="2019"
            title="Dictionnaire français-berrichon: J&#8217;causons coume grand-mée
            (Vol. 2)"
            editor="La Bouchure"
          />
          <Reference
            author="Pinglaut, M."
            date="2020"
            title="Dictionnaire français-berrichon: J&#8217;causons coume cheux nous
            (Vol. 3)"
            editor="La Bouchure"
          />
          <Reference
            author="Pinglaut, M."
            date="2021"
            title="Dictionnaire français-berrichon: J&#8217;causons coume le
            r&#8217;bouteux (Vol. 4)"
            editor="La Bouchure"
          />
        </ul>
      </main>
    </div>
  );
};

export default Sources;
