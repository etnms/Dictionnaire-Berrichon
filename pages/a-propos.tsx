import React from "react";
import Header from "../components/Navbar";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-svh">
        <section className="px-16">
          <h1 className="p-2 text-3xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
            Le projet
          </h1>
          <p className="p-2 dark:text-white">
            Ce projet a pour but de créer un dictionnaire bi-directionel
            berrichon-français et français-berrichon.
          </p>
          <p className="p-2 dark:text-white">
            A travers ce dictionnaire vous pouvez chercher des termes en
            berrichon et accéder à leurs traductions. Vous pouvez également
            chercher l&#39;équivalent d&#39;un mot français en berrichon. Vous
            pouvez ainsi changer la direction de la traduction comme bon vous le
            semble.
          </p>
          <p className="p-2 dark:text-white">
            Il est important de noter que le berrichon n&#39;a pas
            d&#39;orthographe officiel. Il est donc possible que
            l&#39;orthographe de certains termes diffère par rapport à ce que
            vous avez pu voir ailleurs ou ce que vous avez en tête. De plus, le
            berrichon comprend plusieurs dialectes différents, ce qui peut aussi
            impacter l&#39;orthographe de certains mots. Par exemple
            &quot;chieuve&quot; et &quot;chieube&quot; sont deux façon de dire
            chèvre qui varient selon la partie du Berry dans laquelle on se
            trouve.
          </p>
          <p className="p-2 dark:text-white">
            Ce dictionnaire représente ainsi un long travail de dialectologie
            toujours en évolution. Vous pouvez également participer en envoyant
            des mots que vous connaissez qui n&#39;apparaissent pas encore dans
            le dictionnaire.
          </p>
        </section>
        <section className="px-16">
          <p className="p-2 dark:text-white">
            Ce dictionnaire est un projet open-source disponible sur{" "}
            <a
              href="https://github.com/etnms/Dictionnaire-Berrichon"
              className=" font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Github
            </a>
          </p>
        </section>
      </main>
    </>
  );
};

export default About;
