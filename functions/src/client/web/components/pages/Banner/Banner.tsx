import React from 'react'
import { useRouter } from 'next/router'

import SolidButton from '../../common/buttons/SolidButton'

import styles from './Banner.module.css'

interface IProps {
    buttonText : string,
    buttonColor : string,
    buttonTextColor : string,
    infoBackgrounColor : string,
    link : string
}

const Banner = (props : IProps) => {
    const router = useRouter()

    const { buttonColor, link, buttonText,buttonTextColor, infoBackgrounColor, } = props

    return (
        <div className={styles.root} style={{backgroundColor:infoBackgrounColor}}>
            <p><small>some text</small></p>
            <div style={{width:'100px'}}>
                <SolidButton onClick={() => router.push(link)} colorTheme={buttonColor} ><h3 style={{color:buttonTextColor}}>{buttonText}</h3></SolidButton>
            </div>
        </div>
    )
}

export default Banner