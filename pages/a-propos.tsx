import React, { useState } from "react";
import Header from "../components/Navbar";

const About: React.FC = () => {
  return (
    <div className="">
      <Header />
      <section className="px-16">
        <h1 className="p-2 text-3xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
          Le projet
        </h1>
        <p className="p-2">
          Ce projet a pour but de créer un dictionnaire bi-directionel
          berrichon-français et français-berrichon.
        </p>
        <p className="p-2">
          A travers ce dictionnaire vous pouvez chercher des termes en berrichon
          et accéder à leurs traductions. Vous pouvez également chercher
          l'équivalent d'un mot français en berrichon. Vous pouvez ainsi changer
          la direction de la traduction comme bon vous le semble.
        </p>
        <p className="p-2">
          Il est important de noter que le berrichon n'a pas d'orthographe
          officiel. Il est donc possible que l'orthographe de certains termes
          diffère par rapport à ce que vous avez pu voir ailleurs ou ce que vous
          avez en tête. De plus, le berrichon comprend plusieurs dialectes
          différents, ce qui peut aussi impacter l'orthographe de certains mots.
          Par exemple "chieuve" et "chieube" sont deux façon de dire chèvre qui
          varient selon la partie du Berry dans laquelle on se trouve.
        </p>
        <p className="p-2">
          Ce dictionnaire représente ainsi un long travail de dialectologie
          toujours en évolution. Vous pouvez également participer en envoyant
          des mots que vous connaissez qui n'apparaissent pas encore dans le
          dictionnaire.
        </p>
      </section>
      <section className="px-16">
        <p className="p-2">
          Ce dictionnaire est un projet open-source est vous pouvez retrouver le
          site sur Github: <a>lien github</a>{" "}
        </p>
      </section>
    </div>
  );
};

export default About;
