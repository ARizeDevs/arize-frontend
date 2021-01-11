import React from 'react'

import SolidButton from '../buttons/SolidButton'
import Input from '../inputs/Input'
import TagInput from '../inputs/TagInput'
import MultiLineInput from '../inputs/MultiLineInput'
import ImageInput from '../../common/inputs/ImageInput'
import ContentInput from '../../common/inputs/ContentInput'

import styles from './ARStudioPostDetail.module.css'

interface IProps {
    imageSrc : string,
    setImageSrc : (image : string) => void,
    title : string,
    setTitle : (title :string) => void,
    description : string ,
    setDescription : (description : string) => void,
    tags : string[],
    setTags : (tags  : string[]) => void,
    contentFile : any,
    setContentFile : (contentFile : any) => void,
    onFinish : () => void,
    error : {[key : string]:any},
    buttonText : string
}

const ARStudioPostDetail = (props : IProps) => {
    const { error, buttonText, onFinish , imageSrc, setImageSrc, title, setTitle, tags, setTags, description, setDescription, contentFile, setContentFile} = props

    return (
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
                <Input placeholder='title...' error={error.title} maxInputLength={50} required text="Post Title"  type="text" value={title} onChange={setTitle} />
                <MultiLineInput placeholder='description...' maxInputLength={200} required={false} text="Post Description" value={description} onChange={setDescription} />
                <TagInput placeholder='tag...' maxInputLength={30} error={error.tags} tags={tags} onTagsChanged={(tags : string[]) => setTags(tags)} />
                <br></br>
                <div className={styles.contentImageContainer}>
                    <div className={styles.imageInputContainer}>
                        <ImageInput error={error.imageSrc} setImageSrc={setImageSrc}  imageSrc={imageSrc} text='Thumbnail*' extensions={['jpg','jpeg','png']} />
                    </div>
                    <div className={styles.imageInputContainer}>
                        <ContentInput error={error.contentFile} file={contentFile} setFile={setContentFile} extensions={['zip','glb']}  text='GLB / ZIP *' />
                    </div>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <SolidButton onClick={onFinish} ><h3>{buttonText}</h3></SolidButton>
            </div>
        </div>)
}

export default ARStudioPostDetail