import React from 'react';
import styles from "./Header.module.scss";


const Header = () => {
    return (
        <ul className={styles.nav}>
            <li>Dictionnaire</li>
            <li>Grammaire</li>
        </ul>
    );
};

export default Header;