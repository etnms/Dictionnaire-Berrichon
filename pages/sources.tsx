import React from "react";
import Reference from "../components/Reference";
import Navbar from "../components/Navbar";

const Sources: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="px-16 dark:bg-gray-900 min-h-svh">
        <h1 className="p-2 text-3xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
          Sources et références
        </h1>
        <p className="mb-3 p-2 dark:text-white">
          Ce dictionnaire berrichon en ligne est le résultat d'un travail de
          recherche et de regroupement de sources. Vous pouvez donc accéder
          ci-dessous à la liste des travaux au coeur de ce dictionnaire.
        </p>
        <ul className="p-4 list-none">
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
    </>
  );
};

export default Sources;
