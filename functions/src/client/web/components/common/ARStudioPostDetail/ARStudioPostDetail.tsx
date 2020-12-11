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
    error : string,
    buttonText : string
}

const ARStudioPostDetail = (props : IProps) => {
    const { buttonText, onFinish , imageSrc, setImageSrc, title, setTitle, tags, setTags, description, setDescription, contentFile, setContentFile} = props

    return (
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
                <Input required text="Post Title"  type="text" value={title} onChange={(e : any) => setTitle(e.target.value)} />
                <MultiLineInput required={false} text="Post Description" value={description} onChange={(e : any) => {if(e.target.value.length <= 200) setDescription(e.target.value)}} />
                <TagInput tags={tags} onTagsChanged={(tags : string[]) => setTags(tags)} />
                <div className={styles.contentImageContainer}>
                    <div className={styles.imageInputContainer}>
                        <ImageInput setImageSrc={setImageSrc}  imageSrc={imageSrc} text='Thumbnail*' extensions={['jpg','jpeg']} />
                    </div>
                    <div className={styles.imageInputContainer}>
                        <ContentInput file={contentFile} setFile={setContentFile}  text='GLB / GLTF *' />
                    </div>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <SolidButton onClick={onFinish} ><h3>{buttonText}</h3></SolidButton>
            </div>
        </div>)
}

export default ARStudioPostDetail