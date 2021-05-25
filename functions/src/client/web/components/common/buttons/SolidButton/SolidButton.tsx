import React from 'react'
import { IProps } from './interface'

import styles from './SolidButton.module.css'

const SolidButton = (props : IProps) => {
    const { children, styleClass, onClick, colorTheme, width, height, borderRadius } = props


    let newClass = ' '
    if(styleClass) newClass = newClass + styleClass
    let style : any = {}

    if (colorTheme) {
        style = {
            color:`${colorTheme}`,
            background: colorTheme
        }
    }
    if ( width ) style.width = width
    if ( height ) style.height = height 
    if ( borderRadius ) style.borderRadius = borderRadius 

    return (
        <button onClick={onClick} className={styles.btn + newClass} style={style} ><div style={{color:'white'}}>{children}</div></button>
    )
}

export default SolidButton