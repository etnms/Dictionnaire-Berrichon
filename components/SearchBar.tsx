import React from 'react';
import styles from "./SearchBar.module.scss";
import ToggleSwitch from './ToggleSwitch';

function SearchBar() {
    return (
        <div className={styles["wrapper-search"]}>
            <input className={styles["search-bar"]}/>
            <ToggleSwitch/>
            <button className={styles["btn-search"]}>Search</button>
        </div>
    );
};

export default SearchBar;