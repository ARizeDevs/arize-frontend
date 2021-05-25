import React from 'react'

import DefaultAvatar from '../../../../assets/icons/default avatar.svg'

import styles from './RoundImage.module.css'

interface IProps {
    imageSrc? : string,
    color?:string,
    borderRadius? : string
}

const SolidRoundImage = (props : IProps) => {
    const { imageSrc, color, borderRadius } = props

    const style : any = {}
    if(borderRadius) style.borderRadius = borderRadius

    if(imageSrc) {
        return <img className={styles.roundImage} style={style} src={imageSrc} />
    } else {
        if (color) {
            return <div className={styles.roundImage} style={{backgroundColor:color}}></div>
        } else {
            return <DefaultAvatar />
        }
    }
}

export default SolidRoundImage