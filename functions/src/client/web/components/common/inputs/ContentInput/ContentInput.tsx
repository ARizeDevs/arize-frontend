import React from 'react'
import { FilePicker } from 'react-file-picker'

import VideoUploadLogo from '../../../../../assets/icons/video-upload.svg'
import FileUploadedIcon from '../../../../../assets/icons/file-uploaded.svg'


import Message from '../../Message'
import { IMessageTypes } from '../../Message/Message'

import styles from './ContentInput.module.css'

interface IProps {
    text : string,
    extensions? : string[],
    file : any,
    setFile : (file : any) => void,
    error? : string,
    fileNotChanged? : boolean,
}

const ContentInput = (props : IProps) => {
    const { text, extensions, setFile, error, file, fileNotChanged } = props

    let fileChoosingSuccess = false
    
    if(file) {
        if(typeof file === 'string') {
            if(fileNotChanged) {
                fileChoosingSuccess = true
            }
        } else {
            fileChoosingSuccess = true
        }
    }

    const onContentChange = (file : File) => {
        setFile(file)
    } 

    return <div className={styles.root}>
            <p style={{fontWeight:'bold'}} className={error?styles.error:''}>{text}</p>
            {typeof window !== "undefined" ? 
            <div className={`${styles.imagePickerButton} ${error?styles.imagePickerButtonError:(fileChoosingSuccess?styles.imagePickerButtonSuccess:'')}`}>
                
                {extensions?<FilePicker 
                    maxSize={100}
                    extensions={extensions}
                    onChange={onContentChange}
                    onError={(errMsg : any) => {console.log(errMsg)}}
                >
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {!error && fileChoosingSuccess ? 
                            <FileUploadedIcon />:
                            <VideoUploadLogo /> 
                        }
                    </div>
                </FilePicker>: <FilePicker 
                    maxSize={100}
                    // extensions={extensions}
                    onChange={onContentChange}
                    onError={(errMsg : any) => {console.log('here')}}
                >
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {!error && fileChoosingSuccess ? 
                            <FileUploadedIcon />:
                            <VideoUploadLogo /> 
                        }
                    </div>
                </FilePicker>}
            </div> : null }
            {error?<Message type={IMessageTypes.ERROR} text={error} />:null}
            {!error && fileChoosingSuccess?<Message type={IMessageTypes.SUCCESS} text={'File successfully uploaded!'} />:null}
        </div>
}

export default ContentInput