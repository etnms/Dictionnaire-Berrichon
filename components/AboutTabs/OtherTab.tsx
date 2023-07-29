import React from 'react';
import styles from '../../styles/About.module.scss';

function OtherTab() {
    return (
        <div>
            <section>
                <h1 className={styles.title}>Autres</h1>
                <p className={styles.paragraph}>
                    Si le berrichon vous intéresse, vous pouvez trouver ci-dessous le lien sur d'autres ressources sur le sujet:
                </p>
                <ul>
                    <li className={styles['list-el']}><a href="https://www.youtube.com/watch?v=-WX6jEgoQXk&ab_channel=BerryProvince">T'es ti prêt pour la leçon ?</a> Berry province</li>
                </ul>
            </section>
        </div>
    );
}

export default OtherTab;