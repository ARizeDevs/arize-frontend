import React from 'react'

import DefaultAvatar from '../../../../assets/icons/default avatar.svg'

import styles from './RoundImage.module.css'

interface IProps {
    imageSrc? : string,
    color?:string,
}

const SolidRoundImage = (props : IProps) => {
    const { imageSrc, color } = props

    if(imageSrc) {
        return <img className={styles.roundImage} src={imageSrc} />
    } else {
        if (color) {
            return <div className={styles.roundImage} style={{backgroundColor:color}}></div>
        } else {
            return <DefaultAvatar />
        }
    }
}

export default SolidRoundImage