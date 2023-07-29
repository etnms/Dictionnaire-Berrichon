import React from 'react';
import styles from '../../styles/About.module.scss';

function PronunciationTab() {
    return (
        <div>
            <h1 className={styles.title}>Quelques notes sur la prononciation de certains mots</h1>
            <p className={styles.paragraph}>Lorsqu'un mot est écrit avec deux n en berrichon cela veut dire que les deux se prononcent. Par exemple,
                pour "boune année" on dit "an-née" en berrichon et non pas "a-née" comme en français. L'écriture de la double consonne
                "n" est donc importante puisqu'elle reflète la prononciation du mot !
            </p>
        </div>
    );
}

export default PronunciationTab;