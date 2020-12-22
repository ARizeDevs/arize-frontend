import React from 'react'
import { ImagePicker } from 'react-file-picker'

import DefaultAvatar from '../../../../assets/icons/default avatar.svg'

import styles from './RoundImage.module.css'

interface IProps {
    imageSrc? : string,
    onImageChanged? : (imageSrc : string) => void
    unchangeable? : boolean,
    color?:string,
    size? : string
}

const RoundImage = (props : IProps) => {
    const { imageSrc, size, color, onImageChanged , unchangeable } = props

    if(unchangeable) {
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

    return  typeof window !== "undefined" ? 
            <ImagePicker
                extensions={['jpg','jpeg','.png']}
                dims={{width : '100%' , height : '100%'}}
                onChange={onImageChanged}
                onError={(errMsg : any) => {console.log(errMsg)}}
            >
                <div style={{cursor:'pointer',width:size,height:size}}>
                    {imageSrc?<img className={styles.roundImage} src={imageSrc} /> : <DefaultAvatar />}
                </div>
            </ImagePicker>:null
}

export default RoundImage