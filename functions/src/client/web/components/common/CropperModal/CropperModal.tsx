// @ts-nocheck

import React, { useState } from 'react'
import Modal from 'react-modal';
import ReactCrop from 'react-image-crop';
import { ImagePicker } from 'react-file-picker'
const mimeTypes =  require('mimetypes')

import SolidButton from '../buttons/SolidButton'

import FlipVIcon from '../../../../assets/icons/flip-v.svg'
import FlipHIcon from '../../../../assets/icons/flip-h.svg'
import RotateIcon from '../../../../assets/icons/rotate.svg'
import PortraitIcon from '../../../../assets/icons/portrait.svg'
import LandscapeIcon from '../../../../assets/icons/landscape.svg'

import styles from './CropperModal.module.css'

interface IProps {
    modalOpen : boolean , 
    onRequestClose : () => void ,
    imageSrc : string ,
    onImageChange : (newImage : string) => void , 
    onCroppingFinished : (newImage : string) => void
}

const CropperModal = (props : IProps) => {
    const { onRequestClose, modalOpen, imageSrc, onImageChange, onCroppingFinished } = props
    const [crop, setCrop] = useState({ unit : '%' , width: 50, height: 50, x: 25, y: 25});
    const [transform , setTransform] = useState([]);
   
    const onRotateClick = () => {
        if(transform.length > 0) {
            let newTransform : any = [...transform]
            switch (transform[transform.length - 1]) {
                case 'r1' :
                    newTransform[newTransform.length - 1] = 'r2'
                    setTransform(newTransform)
                    break;
                case 'r2' :
                    newTransform[newTransform.length - 1] = 'r3'
                    setTransform(newTransform)
                    break;
                case 'r3' :
                    newTransform.pop()
                    setTransform(newTransform)
                    break;
            
                default:
                    newTransform.push('r1')
                    setTransform(newTransform)
                    break;
            }
        } else {
            setTransform(['r1'])
        }
    }

    const onScaleXClick = () => {
        if(transform.length > 0) {
            let newTransform = [...transform]
            switch (transform[transform.length - 1]) {
                case 'sx' :
                    newTransform.pop()
                    setTransform(newTransform)
                    break;
            
                default:
                    newTransform.push('sx')
                    setTransform(newTransform)
                    break;
            }
        } else {
            setTransform(['sx'])
        }
    }
    const onScaleYClick = () => {
        if(transform.length > 0) {
            let newTransform = [...transform]
            switch (transform[transform.length - 1]) {
                case 'sy' :
                    newTransform.pop()
                    setTransform(newTransform)
                    break;
            
                default:
                    newTransform.push('sy')
                    setTransform(newTransform)
                    break;
            }
        } else {
            setTransform(['sy'])
        }
    }

    const onPortraitClick = () => setCrop({...crop,height: 80 , width : 50 , x : 25 , y : 10 , unit : '%' ,})

    const onLanscapeClick = () =>  setCrop({...crop, width: 50, height: 50, x: 25, y: 25 ,  unit : '%' ,})

    const onFinished = () => {
        // getCroppedImg(imageSrc , crop, transform)
        // .then((base64Image : any) => {
        //     onCroppingFinished(base64Image)
        //     onRequestClose()
        // })

        new Promise(async (resolve , reject) => {
            const canvas = document.createElement('canvas');
            canvas.width = crop.width;
            canvas.height = crop.height;

            const image = document.createElement('img')
            image.src = imageSrc
            image.onload = () => {
                const ctx = canvas.getContext('2d');
                
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                ctx.drawImage(
                    image,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height,
                )
    
                const base64Image = canvas.toDataURL('image/jpeg')
                resolve(base64Image)
            }
        }).then((base64Image) => {
            onCroppingFinished(base64Image)
            onRequestClose()
        })
    }

    const transformStyle = transform.map((t) => {
        switch (t) {
            case 'r1':
                return 'rotate(90deg)'
            case 'r2':
                return 'rotate(180deg)'
            case 'r3':
                return 'rotate(270deg)'
            case 'sx':
                return 'scaleX(-1)'
            case 'sy':
                return 'scaleY(-1)'
            default:
                return '';
        }
    }).join(' ')


    return (
        <Modal
                isOpen={modalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={onRequestClose}
                className={styles.modal}
                overlayClassName={styles.overlay}
                contentLabel="Example Modal"
                >
            <div className={styles.root}>
                <div className={styles.header}>
                    <div onClick={onRequestClose} className={styles.closeBTN}>X</div>
                </div>
                <div className={styles.body}>
                    <ReactCrop imageStyle={{transform : transformStyle}} className={styles.cropper} keepSelection src={imageSrc} crop={crop} onChange={newCrop => setCrop(newCrop)} />;
                </div>
                <div className={styles.footer}>
                    {/* <div className={styles.footerSubContainer}>
                        <div onClick={onScaleXClick} className={styles.options}>
                            <FlipVIcon />
                        </div>
                        <div onClick={onScaleYClick} className={styles.options}>
                            <FlipHIcon />   
                        </div>
                        <div onClick={onRotateClick} className={styles.options}>
                            <RotateIcon />   
                        </div>
                        <div onClick={onPortraitClick} className={styles.options}>
                            <PortraitIcon />   
                        </div>
                        <div onClick={onLanscapeClick} className={styles.options}>
                            <LandscapeIcon />   
                        </div>
                    </div> */}
                    <div className={styles.footerSubContainer}>
                        <div style={{width:'200px'}}>
                            {/* @ts-ignore */}
                            {typeof window !== "undefined" ? <ImagePicker
                                extensions={['jpg', 'jpeg', 'png']}
                                dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                                onChange={base64 => {onImageChange(base64); setTransform([])}}
                                onError={errMsg => {console.log(errMsg)}}
                            >
                                <SolidButton colorTheme={'black'} onClick={() => {}} ><h3>Choose Another</h3></SolidButton>
                            </ImagePicker> : null}
                        </div>&nbsp;&nbsp;&nbsp;
                        <div style={{width:'200px'}}>
                            <SolidButton  onClick={onFinished} ><h3>Done</h3></SolidButton>
                        </div>&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
            </div>                
        </Modal>
    )
}

const getCroppedImg = (image : any, crop : any, transform : string[]) => {
    return new Promise(async (resolve , reject) => {

        try {
            const imageComputedStyle = getComputedStyle(document.getElementsByClassName( 'ReactCrop__image' )[0] , null)
            let maxWidth  = imageComputedStyle.getPropertyValue('width')
            let maxHeight = imageComputedStyle.getPropertyValue('height')
    
            maxWidth = maxWidth.substr(0,maxWidth.length-2) 
            maxHeight = maxHeight.substr(0,maxHeight.length-2)
    
            const img = document.createElement('img')
            img.src = image
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = crop.width / parseInt(maxWidth) * img.width;
                canvas.height = crop.height / parseInt(maxHeight) * img.height;
                const ctx = canvas.getContext('2d');
                ctx.translate(canvas.width/2 , canvas.height/2)
                transform.forEach((t) => {
                    switch (t) {
                        case 'r1':
                            ctx.rotate(Math.PI /2)
                            break;
                        case 'r2':
                            ctx.rotate(Math.PI )
                            break;
                        case 'r3':
                            ctx.rotate(Math.PI * 3 / 2)
                            break;
                        case 'sx':
                            ctx.scale(-1,1)
                        case 'sy':
                            ctx.scale(1,-1)
                        default:
                            break;
                    }
                })
                
                ctx.drawImage(
                    img,
                    crop.x / parseInt(maxWidth) * img.width,
                    crop.y / parseInt(maxHeight) * img.height,
                    crop.width / parseInt(maxWidth) * img.width,
                    crop.height / parseInt(maxHeight) * img.height,
                    -canvas.width/2,
                    -canvas.height/2,
                    crop.width / parseInt(maxWidth) * img.width,
                    crop.height / parseInt(maxHeight) * img.height
                )
    
                const base64Image = canvas.toDataURL("image/jpeg")
                resolve(base64Image)
            }
        } catch(error) {
            reject(error)
        }
    })
}

export default CropperModal