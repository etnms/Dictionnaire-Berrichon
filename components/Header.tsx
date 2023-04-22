import React from 'react';
import styles from "./Header.module.scss";
import Link from 'next/link';


const Header = () => {
    return (
        <ul className={styles.nav}>
            <li><Link href="/">Dictionnaire</Link></li>
            <li><Link href="/sources">Sources et references</Link></li>
            {/*<li>Grammaire</li>*/}
        </ul>
    );
};

export default Header;