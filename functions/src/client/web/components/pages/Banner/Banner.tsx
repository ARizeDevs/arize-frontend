import React from 'react'
import { useRouter } from 'next/router'

import SolidButton from '../../common/buttons/SolidButton'

import styles from './Banner.module.css'

interface IProps {
    buttonText : string,
    buttonColor : string,
    buttonTextColor : string,
    infoBackgrounColor : string,
    link : string,
    infoText : string
}

const Banner = (props : IProps) => {
    const router = useRouter()

    const { buttonColor, infoText, link, buttonText,buttonTextColor, infoBackgrounColor, } = props

    return (
        <div className={styles.root} style={{backgroundColor:infoBackgrounColor}}>
            <div style={{width:"70%",display:'flex'}}>
                <small >{infoText}</small>
            </div>
            <div style={{width:'30%'}}>
                <SolidButton onClick={() => router.push(link)} colorTheme={buttonColor} ><p style={{color:buttonTextColor}}>{buttonText}</p></SolidButton>
            </div>
        </div>
    )
}

export default Banner