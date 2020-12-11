import React from 'react'

import styles from './VersatileImageContainer.module.css'

interface IProps {
    imageURL : string,
}

const VersatileImageContainer = (props : IProps) => {
    const { imageURL } = props 

    return (
        <div className={styles.root}>
            <img  src={imageURL} className={styles.image} />
        </div>
    )
}

export default VersatileImageContainer