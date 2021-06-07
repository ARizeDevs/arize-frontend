import React, { useEffect, useState } from 'react';
import styles from './TDGalleryItem.module.css';
import {getDirectURL} from '../../../config/firebase'

interface IProps {

    imageURL: string,
    glbFileURL: string,
    usdzFileURL: string,
    name: string
}

const TDGalleryItem = (props: IProps) => {
    
    const{ imageURL, glbFileURL, usdzFileURL, name} = props;

    const [image, setImage] = useState('');

    const OnItemCicked = () => {

    }


    useEffect(() => {
        getDirectURL(imageURL).then((url: string) => {
            setImage(url);
        })
        .catch ((error) => console.log(error))
    },[imageURL]) 


    return(
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
                <img className={styles.imageContainer} onClick={() => {}} src={image} ></img>
            </div>
        </div>
    )
}

export default TDGalleryItem;
