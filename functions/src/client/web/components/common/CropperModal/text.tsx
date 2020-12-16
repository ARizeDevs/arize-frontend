// @ts-nocheck
import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import ReactCrop from 'react-image-crop';
import { ImagePicker } from 'react-file-picker'

import SolidButton from '../buttons/SolidButton'

import styles from './CropperModal.module.css'

class ReactCropperModal extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: '%',
      x : 25,
      width: 50,
      y : 25,
      height : 50
    //   aspect: 16 / 9,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
      console.log('comp')
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    console.log('======================')
    console.log(image.naturalWidth)
    console.log(image.naturalHeight)
    console.log(image.width)
    console.log(image.height)
    console.log(crop)
    console.log(scaleX)
    console.log(scaleY)
    console.log('=======================')
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    return base64Image
  }

    componentDidUpdate() {
      if(this.props.imageSrc) {
        this.setState({ src: this.props.imageSrc }, () => {
        })
      }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        this.props.onFinished(this.state.croppedImageUrl);
        this.props.onRequestClose()
    }
  }


  render() {
    const { crop, croppedImageUrl, src } = this.state;
    const { modalOpen, onRequestClose, onFinished, onImageChange } = this.props

        return (<Modal
                isOpen={modalOpen}
                onRequestClose={onRequestClose}
                className={styles.modal}
                overlayClassName={styles.overlay}
                contentLabel="Example Modal"
                >
            <div className={styles.root} onKeyDown={this.handleKeyDown}>
                <div className={styles.header}>
                    <div onClick={onRequestClose} className={styles.closeBTN}>X</div>
                </div>
                <div className={styles.body} >
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                        // imageStyle={{transform : transformStyle}} 
                        className={styles.cropper}
                    />
                    )}
                    {/* <ReactCrop imageStyle={{transform : transformStyle}} className={styles.cropper} keepSelection src={imageSrc} crop={crop} onChange={newCrop => setCrop(newCrop)} />; */}
                </div>
                <div className={styles.footer}>
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
                            <SolidButton  onClick={() => {onFinished(this.state.croppedImageUrl);onRequestClose()}} ><h3>Done</h3></SolidButton>
                        </div>&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
            </div>                
        </Modal>
    )
  }
}

export default ReactCropperModal