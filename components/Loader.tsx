import React from 'react';
import Spinner from './Spinner';
import styles from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <Spinner/>
            <p className={styles.text}>Chargement</p>
        </div>
    );
};

export default Loader;