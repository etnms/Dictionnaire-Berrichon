import React from "react";

import Header from "../components/Navbar";

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
          <li>
            Gilbert, J.-P. (2006). <em>Petit dictionnaire berrichon.</em>{" "}
            <a href="http://www.gilblog.fr/petit-dictionnaire-berricho/index.html">
              http://www.gilblog.fr/petit-dictionnaire-berricho/index.html
            </a>
          </li>
          <li>
            Gilbert, J.-P. (2022).{" "}
            <em>Histoires Vraies, Sornettes et Menteries du Haut Berry.</em>{" "}
            Alyce Lyner éditions.
          </li>
          <li>
            Pinglaut, M. (2018).{" "}
            <em>
              Dictionnaire français-berrichon: J&#8217;causons comme Molière
              (Vol. 1).
            </em>{" "}
            La Bouchure.
          </li>
          <li>
            Pinglaut, M. (2019).{" "}
            <em>
              Dictionnaire français-berrichon: J&#8217;causons coume grand-mée
              (Vol. 2).
            </em>{" "}
            La Bouchure.
          </li>
          <li>
            Pinglaut, M. (2020).{" "}
            <em>
              Dictionnaire français-berrichon: J&#8217;causons coume cheux nous
              (Vol. 3).
            </em>{" "}
            La Bouchure.
          </li>
          <li>
            Pinglaut, M. (2021).{" "}
            <em>
              Dictionnaire français-berrichon: J&#8217;causons coume le
              r&#8217;bouteux (Vol. 4).
            </em>{" "}
            La Bouchure.
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Sources;
