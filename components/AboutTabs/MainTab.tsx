import React from 'react';
import styles from '../../styles/About.module.scss';

function MainTab() {
    return (
        <div>
            <section>
                <h1 className={styles.title}>Le projet</h1>
                <p className={styles.paragraph}>Ce projet a pour but de créer un dictionnaire bi-directionel berrichon-français et français-berrichon.</p>
                <p className={styles.paragraph}>A travers ce dictionnaire vous pouvez chercher des termes en berrichon et accéder à leurs traductions.
                    Vous pouvez également chercher l'équivalent d'un mot français en berrichon. Vous pouvez ainsi changer la direction
                    de la traduction comme bon vous le semble.
                </p>
                <p className={styles.paragraph}>Il est important de noter que le berrichon n'a pas d'orthographe officiel. Il est donc possible que l'orthographe de
                    certains termes diffère par rapport à ce que vous avez pu voir ailleurs ou ce que vous avez en tête. De plus, le berrichon
                    comprend plusieurs dialectes différents, ce qui peut aussi impacter l'orthographe de certains mots. Par exemple
                    "chieuve" et "chieube" sont deux façon de dire chèvre qui varient selon la partie du Berry dans laquelle on se trouve.
                </p>
                <p className={styles.paragraph}>Ce dictionnaire représente ainsi un long travail de dialectologie toujours en évolution.
                    Vous pouvez ainsi nous signaler si il manque certains mots ou bien si vous connaissez d'autres orthographes pour les
                    mots déjà répertoriés.</p>
            </section>
            <section>
                <p className={styles.paragraph}>Ce dictionnaire est un projet open-source est vous pouvez retrouver le site sur Github: <a>lien github</a> </p>
            </section>
        </div>
    );
}

export default MainTab;