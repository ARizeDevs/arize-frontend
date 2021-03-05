import React from 'react'

import styles from './LoadingInline.module.css'

const LoadingInline = () => {
    return (
        <div className={styles.root}>
            <div className={styles.circleRoot}>
                <div className={`${styles.circle} ${styles.anim1}`}></div>
                <div className={`${styles.circle} ${styles.anim2}`}></div>
                <div className={`${styles.circle} ${styles.anim3}`}></div>
            </div>
            <h3>
                Loading...
            </h3>
        </div>
    )
}

export default LoadingInline