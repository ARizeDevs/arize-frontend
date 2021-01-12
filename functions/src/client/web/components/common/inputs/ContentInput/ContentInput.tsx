import React , { useState } from 'react'
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

    const [ localError, setLocalError ] = useState('')

    let fileChoosingSuccess = false
    
    if(file) {
        if(typeof file === 'string') {
            if(fileNotChanged) {
                fileChoosingSuccess = true
                if(localError)
                    setLocalError('')
            }
        } else {
            fileChoosingSuccess = true
            if(localError)
                setLocalError('')
        }
    }

    const onContentChange = (file : File) => {
        setFile(file)
    } 

    return <div className={styles.root}>
            <p style={{fontWeight:'bold'}} className={error || localError?styles.error:''}>{text}</p>
            {typeof window !== "undefined" ? 
            <div className={`${styles.imagePickerButton} ${error || localError?styles.imagePickerButtonError:(fileChoosingSuccess?styles.imagePickerButtonSuccess:'')}`}>
                
                {extensions?<FilePicker 
                    maxSize={25}
                    extensions={extensions}
                    onChange={onContentChange}
                    onError={(errMsg : any) => setLocalError(errMsg)}
                >
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {!error && !localError && fileChoosingSuccess ? 
                            <FileUploadedIcon />:
                            <VideoUploadLogo /> 
                        }
                    </div>
                </FilePicker>: <FilePicker 
                    maxSize={25}
                    // extensions={extensions}
                    onChange={onContentChange}
                    onError={(errMsg : any) => setLocalError(errMsg)}
                >
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {!error && !localError && fileChoosingSuccess ? 
                            <FileUploadedIcon />:
                            <VideoUploadLogo /> 
                        }
                    </div>
                </FilePicker>}
            </div> : null }
            {error ?<Message type={IMessageTypes.ERROR} text={error} />:
                localError ? <Message type={IMessageTypes.ERROR} text={localError} />:null
            }
            {!error && !localError && fileChoosingSuccess?<Message type={IMessageTypes.SUCCESS} text={'File successfully uploaded!'} />:null}
        </div>
}

export default ContentInput