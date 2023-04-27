import React from 'react';
import styles from "./Spinner.module.scss";


interface ISpinnerProperties {
    height?: string;
    width?: string;
    border?: string;
    borderTop?: string;
}
function Spinner(props: ISpinnerProperties) {
    const { height, width, border, borderTop } = props;
    return (
        <div className={styles.loader} style={{ height, width, border, borderTop }}>
        </div>
    );
}

export default Spinner;