import React , { useState } from 'react'
import { ImagePicker } from 'react-file-picker'

const mimeTypes =  require('mimetypes')

import CropperModal from '../../CropperModal'

import ImageUploadLogo from '../../../../../assets/icons/image upload.svg'

import styles from './ImageInput.module.css'
import Message from '../../Message'
import { IMessageTypes } from '../../Message/Message'
import Toggle from '../Toggle'

interface IProps {
    text : string,
    extensions? : string[],
    imageSrc : string,
    setImageSrc : (image : string) => void,
    toggle? : boolean,
    setToggle? : (value : boolean) => void,
    error? : string
}

const ImageInput = (props : IProps) => {
    const { toggle, error, setToggle, text, extensions, imageSrc, setImageSrc } = props

    const [ modalOpen , setModalOpen ] = useState(false)

    const [ localError, setLocalError ] = useState('')

    if(imageSrc && localError) setLocalError('')

    const onImageChange = (base64Image : string) => {
        let mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)![1]
        const extension = mimeTypes.detectExtension(mimeType)
        if(extensions) {
            const result = extensions.findIndex((item) => item===extension)
            if(result !== -1) {
                setImageSrc(base64Image)
                setModalOpen(true)
            } else {
                setImageSrc('')
                setModalOpen(false)
            }
        } else {
            setImageSrc(base64Image)
            setModalOpen(true)
        }
    } 

    return <div className={styles.root}>
            {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}> */}
                {/* <p style={{display:'flex',fontWeight:'bold',alignItems:'center'}} className={error || localError?styles.error:''}>{text}</p> */}
                {toggle && setToggle?
                    <Toggle  active={toggle} setActive={setToggle} text={text} />
                :null}
            {/* </div> */}
            {/* @ts-ignore */}
            {toggle === undefined || toggle ?
                <>
                {imageSrc === '' && typeof window !== "undefined" ? 
                <div className={`${styles.imagePickerButton} ${error || localError?styles.imagePickerButtonError:''}`}>
                {extensions?<ImagePicker
                        extensions={extensions}
                        maxSize={5}
                        dims={{width : '100%' , height : '100%'}}
                        onChange={onImageChange}
                        onError={(errMsg : any) => setLocalError(errMsg)}
                    >
                        <div onClick={() => setModalOpen(true)}  style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>

                            <ImageUploadLogo />
                        </div>
                    </ImagePicker>:<ImagePicker
                        dims={{width : '100%' , height : '100%'}}
                        onChange={onImageChange}
                        maxSize={5}
                        onError={(errMsg : any) => setLocalError(errMsg)}
                    >
                        <div onClick={() => setModalOpen(true)}  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

                            <ImageUploadLogo />
                        </div>
                    </ImagePicker>} 
                </div> :
                <div className={`${styles.imagePickerButton} ${error || localError?styles.imagePickerButtonError:''}`}>
                    <img onClick={() => setModalOpen(true)} src={imageSrc} className={styles.image}>

                    </img>
                </div>}
                {error ?<Message type={IMessageTypes.ERROR} text={error} />:
                    localError ? <Message type={IMessageTypes.ERROR} text={localError} />:null
                }
                {/* @ts-ignore */}
                <CropperModal onFinished={(newImage : string) => setImageSrc(newImage)} imageSrc={imageSrc} onImageChange={onImageChange} modalOpen={modalOpen} onRequestClose={() => setModalOpen(false)} />
                </>
            :null}
        </div>
}

export default ImageInput