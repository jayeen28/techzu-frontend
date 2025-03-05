import React from 'react';
import styles from './mainloading.module.scss'

const MainLoading = () => {
    return (
        <div className={styles.spinner_container}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default MainLoading;
