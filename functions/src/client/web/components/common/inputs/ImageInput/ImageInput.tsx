import React , { useState } from 'react'
import { FilePicker } from 'react-file-picker'

import CropperModal from '../../CropperModal'

import ImageUploadLogo from '../../../../../assets/icons/image upload.svg'

import styles from './ImageInput.module.css'
import Message from '../../Message'
import { IMessageTypes } from '../../Message/Message'
import Toggle from '../Toggle'
import toDataURL from '../../../../helpers/toDataURL'

interface IProps {
    text : string,
    extensions? : string[],
    imageSrc : string,
    setImageSrc : (image : string) => void,
    // hdrFile? : any,
    // setHDRFile? : (file : any) => void,
    toggle? : boolean,
    setToggle? : (value : boolean) => void,
    error? : string
    description?: string,
    noCropper? : boolean
}



const ImageInput = (props : IProps) => {
    const { toggle, error, 
        // hdrFile, setHDRFile, 
        setToggle, text, extensions, noCropper, imageSrc, setImageSrc, description } = props

    const [ modalOpen , setModalOpen ] = useState(false)

    const [ localError, setLocalError ] = useState('')

    if(imageSrc && localError) setLocalError('')

    console.log('--------');
    console.log(error);
    console.log(localError);
    
    const onImageChange = async (file : File) => {
        // const name = file.name
        // const splitedName = name.split('.')
        // const extension = splitedName[splitedName.length -1 ]
        // if(extension === 'hdr') {
        //     console.log('xd');
        //     console.log(file);
        //     if(setHDRFile) setHDRFile(file)
        //     setImageSrc('')
        // } else {
            const base64Image : string = await toDataURL(URL.createObjectURL(file)) as string
            setImageSrc(base64Image)
            // if(setHDRFile) setHDRFile(null)
            if(!noCropper) setModalOpen(true)
        // }
        // console.log(base64Image)
        // let mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)![1]
        // const extension = mimeTypes.detectExtension(mimeType)
        // console.log(extension);
        
        // if(extensions) {
        //     const result = extensions.findIndex((item) => item===extension)
        //     if(result !== -1) {
        //         console.log('1');
                
        //     } else {
        //         console.log('2');
        //         setImageSrc('')
        //         setModalOpen(false)
        //     }
        // } else {
        //     setImageSrc(base64Image)
        //     setModalOpen(true)
        // }
    } 

    return <div className={styles.root}>
                {toggle !== undefined && setToggle !== undefined?
                    <Toggle  active={toggle} setActive={setToggle} text={text} />
                :
                <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <p style={{display:'flex',fontWeight:'bold',alignItems:'center'}} className={error || localError?styles.error:''}>{text}</p>
                </div>
                }
                <p style={{fontWeight:'normal'}} >{description}</p>
            {/* @ts-ignore */}
            {toggle === undefined || toggle ?
                <>
                {imageSrc === '' && typeof window !== "undefined" ? 
                <div className={`${styles.imagePickerButton} ${error || localError?styles.imagePickerButtonError:''}`}>
                {extensions?
                    <FilePicker
                        extensions={extensions}
                        maxSize={5}
                        dims={{width : '100%' , height : '100%'}}
                        onChange={onImageChange}
                        onError={(errMsg : any) => {console.log(errMsg);setLocalError(errMsg)}}
                    >
                        <div onClick={() => {if(!noCropper) setModalOpen(true)}}  style={{width:'100%',height:'100px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <ImageUploadLogo />
                        </div>
                    </FilePicker>:<FilePicker
                        dims={{width : '100%' , height : '100%'}}
                        onChange={onImageChange}
                        maxSize={5}
                        onError={(errMsg : any) => {console.log(errMsg);setLocalError(errMsg)}}
                    >
                        <div onClick={() => {if(!noCropper) setModalOpen(true)}}  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

                            <ImageUploadLogo />
                        </div>
                    </FilePicker>} 
                </div>:
                (noCropper?
                <FilePicker
                        dims={{width : '100%' , height : '100%'}}
                        onChange={onImageChange}
                        maxSize={5}
                        onError={(errMsg : any) => {console.log(errMsg);setLocalError(errMsg)}}
                    >
                    <div className={`${styles.imagePickerButton} ${error || localError?styles.imagePickerButtonError:''}`}>
                        <img onClick={() => {if(!noCropper) setModalOpen(true)}} src={imageSrc} className={styles.image}>

                        </img>
                    </div>
                </FilePicker>
                :
                <div className={`${styles.imagePickerButton} ${error || localError?styles.imagePickerButtonError:''}`}>
                    <img onClick={() => {if(!noCropper) setModalOpen(true)}} src={imageSrc} className={styles.image}>

                    </img>
                </div>)}
                {error ?<Message type={IMessageTypes.ERROR} text={error} />:
                    localError ? <Message type={IMessageTypes.ERROR} text={localError} />:null
                    // hdrFile?<Message type={IMessageTypes.ACTIVE} text={'File successfully uploaded!'} />:null
                }

                {/* @ts-ignore */}
                <CropperModal onFinished={(newImage : string) => { setImageSrc(newImage);}} imageSrc={imageSrc} onImageChange={onImageChange} modalOpen={modalOpen} onRequestClose={() => setModalOpen(false)} />
                </>
            :null}
        </div>
}

export default ImageInput