import React from 'react'

import styles from './TipBox.module.css'

interface IProps {
    style : Object,
    title : string,
    description : string,
    imageSrc : string
}

const TipBox = (props : IProps) => {
    const { style, description, imageSrc, title, } = props

    return (
        <div className={styles.shadowedBox} style={style}>

            <div className={styles.mediaContainer} style={{background:`url(${imageSrc})`}}>
                
            </div>
            <div className={styles.textContainer}>
                <h3>{title}</h3>
                <div style={{width:'100%'}}>
                    <p style={{textOverflow: 'ellipsis',overflow:'hidden'}}>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default TipBox