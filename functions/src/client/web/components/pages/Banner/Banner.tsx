import React from 'react'
import { useRouter } from 'next/router'

import SolidButton from '../../common/buttons/SolidButton'

import GlobeIcon from '../../../../assets/icons/globe.svg'

import styles from './Banner.module.css'

interface IProps {
    isAndroid : boolean,
    buttonText : string,
    buttonColor : string,
    buttonTextColor : string,
    infoBackgrounColor : string,
    postTitle : string,
    link : string,
    infoText : string
}

const Banner = (props : IProps) => {
    const router = useRouter()

    const { isAndroid, postTitle, buttonColor, infoText, link, buttonText,buttonTextColor, infoBackgrounColor, } = props

    if(isAndroid) {
        return (
            <div className={styles.root} style={{backgroundColor:'white',width:'80%'}}>
                <div style={{width:"70%",display:'flex'}}>
                    <small >{postTitle}</small>
                </div>
                <div style={{width:'35%'}}>
                    <SolidButton height='30px' onClick={() => router.push(link)} colorTheme={'blue'} ><div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',width:'100%'}}><GlobeIcon /><p style={{color:'white'}}>visit</p></div></SolidButton>
                </div>
            </div>
        )
    }

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