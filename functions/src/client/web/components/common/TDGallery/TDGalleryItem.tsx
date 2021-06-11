import React, { useEffect, useState } from 'react';
import styles from './TDGalleryItem.module.css';
import {getDirectURL} from '../../../config/firebase'
import Checked from '../../../../assets/icons/checked-big.svg'

interface IProps {
    onClick: () => void,
    imageURL: string,
    glbFileURL: string,
    usdzFileURL: string,
    name: string
    selected : boolean
}

const TDGalleryItem = (props: IProps) => {
    
    const{ imageURL, selected, onClick} = props;

    const [image, setImage] = useState('');

    useEffect(() => {
        getDirectURL(imageURL).then((url: string) => {
            setImage(url);
        })
        .catch ((error) => console.log(error))
    },[imageURL]) 


    return(
        <div onClick={onClick} className={styles.root}>
                <img className={styles.imageContainer} onClick={() => {}} src={image} ></img>
                <div style={{ left:'0px',top:'50%',position:'absolute',width:'100%',display:'flex',justifyContent:'center',alignItems:'center' }}> 
                  {selected?<Checked></Checked>:null}
                </div>
            </div>
    )
}

export default TDGalleryItem;
