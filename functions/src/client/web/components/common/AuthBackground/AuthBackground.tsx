import React from 'react'

import ArizeIcon from '../../../../assets/icons/arize-logo.svg'
import Cubes from '../../../../assets/icons/web-auth-background/auth-cubes.svg'


import styles from './AuthBackground.module.css'

const AuthBackground = () => {
    return (
    <div className={styles.root}>
        <div className={styles.titleContainer}>
            <div className={styles.logoContainer}>
                <ArizeIcon />
                <h1>&nbsp;AR<span style={{fontWeight:'normal'}}>ize</span></h1>
            </div>
            <p>Augmented Reality</p>
        </div>
        <div className={styles.backgroundCubesContainer}>
            <Cubes />
        </div>
    </div>)
}

export default AuthBackground