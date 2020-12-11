import React from 'react'
import { FilePicker } from 'react-file-picker'

import VideoUploadLogo from '../../../../../assets/icons/video-upload.svg'

import styles from './ContentInput.module.css'

interface IProps {
    text : string,
    extensions? : string[],
    file : any,
    setFile : (file : any) => void
}

const ContentInput = (props : IProps) => {
    const { text, extensions, setFile } = props

    const onContentChange = (file : File) => {
        setFile(file)
    } 

    return <div className={styles.root}>
            <p>{text}</p>
            {typeof window !== "undefined" ? 
            <div className={styles.imagePickerButton}>
                
                {extensions?<FilePicker 
                    maxSize={100}
                    extensions={extensions}
                    onChange={onContentChange}
                    onError={(errMsg : any) => {console.log(errMsg)}}
                >
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <VideoUploadLogo />
                    </div>
                </FilePicker>: <FilePicker 
                    maxSize={100}
                    // extensions={extensions}
                    onChange={onContentChange}
                    onError={(errMsg : any) => {console.log(errMsg)}}
                >
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <VideoUploadLogo />
                    </div>
                </FilePicker>}
            </div> : null }
        </div>
}

export default ContentInput