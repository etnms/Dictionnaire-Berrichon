import React, { useState } from 'react';
import Header from '../components/Header';
import styles from "../styles/About.module.scss";
import MainTab from '../components/AboutTabs/MainTab';
import PronunciationTab from '../components/AboutTabs/PronunciationTab';
import OtherTab from '../components/AboutTabs/OtherTab';

function About() {

    const [indexTab, changeIndexTab] = useState<number>(0); // default to first index

    function displayTab() {

        switch(indexTab){
            case 0:
                return MainTab();
            case 1:
                return PronunciationTab();
            case 2:
                return OtherTab();
            default:
                return MainTab();
        }
    }
    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <div>
                    <button onClick={() => changeIndexTab(0)}>Le projet</button>
                    <button onClick={() => changeIndexTab(1)}>Notes sur la prononciation</button>
                    <button onClick={() => changeIndexTab(2)}>Autres</button>
                </div>
                {displayTab()}
            </main>
        </div>

    );
}

export default About;