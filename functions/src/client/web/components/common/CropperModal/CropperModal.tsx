// @ts-nocheck
import React, { useState, useCallback, useEffect } from 'react'
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'
import Modal from 'react-modal';
import { ImagePicker } from 'react-file-picker'


import getCroppedImg from './CropImage'
import SolidButton from '../buttons/SolidButton'

import CrossIcon from '../../../../assets/icons/cross.svg'

import styles from './CropperModal.module.css'

const CropperModal = (props) => {
    const { imageSrc } = props

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [initialCroppedAreaPixels, setInitialCroppedAreaPixels] = useState(
    undefined
  )
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(
    undefined
  )
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const croppedAreaPixels = JSON.parse(
      window.localStorage.getItem('croppedAreaPixels')
    )
    setInitialCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
    window.localStorage.setItem(
      'croppedAreaPixels',
      JSON.stringify(croppedAreaPixels)
    )
  }, [])

  const { modalOpen, onRequestClose, onFinished, onImageChange } = props

  return (
    <Modal
        isOpen={modalOpen}
        onRequestClose={onRequestClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel="Example Modal"
    >
        <div className={styles.root} >
            <div className={styles.header}>
                <div onClick={onRequestClose} className={styles.closeBTN}>
                  <CrossIcon />
                </div>
            </div>
            <div className={styles.body} >
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    initialCroppedAreaPixels={initialCroppedAreaPixels}
                />
            </div>
            <div className={styles.footer}>
                <div className={styles.sliderContainer}>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => setZoom(zoom)}
                        classes={{ container: styles.slider }}
                    />
                </div>
                <div className={styles.footerSubContainer}>
                    <div style={{width:'200px'}}>
                            {/* @ts-ignore */}
                        {typeof window !== "undefined" ? <ImagePicker
                            extensions={['jpg', 'jpeg', 'png']}
                            dims={{width : '100%' , height : '100%'}}
                            onChange={base64 => {onImageChange(base64); }}
                            onError={errMsg => {console.log(errMsg)}}
                        >
                            <SolidButton colorTheme={'black'} onClick={() => {}} ><h3>Choose Another</h3></SolidButton>
                        </ImagePicker> : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div style={{width:'200px'}}>
                        <SolidButton  onClick={async () => {
                            const res = await getCroppedImg(imageSrc,croppedAreaPixels);
                            onFinished(res);
                            onRequestClose()}} >
                        <h3>Done</h3></SolidButton>
                    </div>&nbsp;&nbsp;&nbsp;
                </div>
            </div>
        </div>                
    </Modal>
  )
}

export default CropperModal