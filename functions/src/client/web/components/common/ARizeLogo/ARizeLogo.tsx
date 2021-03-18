import React from 'react'

import ARizeIconColored from '../../../../assets/icons/arize-logo-colored.svg'

import styles from './ARizeLogo.module.css'

const ARizeLogo = () => {
    return (<div className={styles.root}>
        <ARizeIconColored /><h2>&nbsp;<a href="/profile">Home</a></h2>
    </div>)
}

export default ARizeLogo