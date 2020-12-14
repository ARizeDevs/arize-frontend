import React , { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


import firebase from '../../../config/firebase'
import Navbar from '../../common/Navbar'
import Preview from '../../common/Preview'
import ARStudioPostDetail from '../../common/ARStudioPostDetail'
import { savePost, getPost, editPost } from '../../../API'

import styles from './ARStudio.module.css'
import ARStudioProgress from '../../common/ARStudioProgress'
import ARStudioCustomize from '../../common/ARStudioCustomize'

interface IProps {
    isEdit? : boolean,
    postID? : string | string[]
}

const ARStudio = (props : IProps) => {

    const { isEdit, postID, } = props

    const router = useRouter()

    const [ submiting , setSubmiting ] = useState(false)
    const [ generalError , setGeneralError ] = useState('')

    const [ page, setPage ] = useState(1)
    const [ imageSrc , setImageSrc ] = useState('')

    const [ imageSrcChanged, setImageSrcChanged] = useState(false)
    const [ backGroundImageChanged, setBackgroundImageChanged ] = useState(false)
    const [ contentFileChanged, setContentFileChanged] = useState(false)

    const [ title , setTitle ] = useState('')
    const [ description , setDescription ] = useState('')
    const [ tags , setTags ] = useState(['3DModel'])
    const [ contentFile , setContentFile ] = useState(null)
    // const [ uploadProgress, setUplaodProgress ] = useState(0)
    const [ uploadStatus, setUploadStatus ] = useState('')
    const [ actionBUttonTextColor, setActionBUttonTextColor] = useState('')
    const [ actionButtonColor, setActionButtonColor] = useState('')
    const [ actionButtonLink, setActionButtonLink] = useState('')
    const [ actionButtonText, setActionButtonText] = useState('')
    const [ hasShadow, setHasShadow ] = useState(false)
    const [ autoPlay, setAutoPlay ] = useState(false) 
    const [ hasBackground, setHasBackground ] = useState(true)
    const [ actionInfoBackgroundColor, setActionInfoBackgroundColor] = useState('')
    const [ postBackgroundImageBase64, setPostBackgroundImageBase64] = useState('')

    useEffect(() => {
        if(isEdit && postID) {
            const getInitData = async () => {
                try {
                    let id = postID
                    if(postID && typeof postID === typeof [])
                    {
                        id = postID[0]
                    }
                    const post = await getPost(id as string, false)
                    if(post && post.data.data){
                        const postData = post.data.data.data
                        setTitle(postData.title)
                        firebase.storage().ref(postData.imageURL).getDownloadURL().then((url) => setImageSrc(url))
                        setDescription(postData.description)
                        setTags(postData.tags.split(','))
                        setActionBUttonTextColor(postData.actionBUttonTextColor)
                        setActionButtonColor(postData.actionButtonColor)
                        setActionButtonLink(postData.actionButtonLink)
                        setActionButtonText(postData.actionButtonText)
                        setActionInfoBackgroundColor(postData.actionInfoBackgroundColor)
                        firebase.storage().ref(postData.glbFileURL).getDownloadURL().then((url) => setContentFile(url))
                        if(postData.backGroundImage) firebase.storage().ref(postData.backGroundImage).getDownloadURL().then((url) => setPostBackgroundImageBase64(url))
                        if(!postData.backGroundImage) setHasBackground(false)
                    }
                } catch (error) {

                }
            }
            getInitData()
        }
    } , [isEdit,postID])

    const onPostDetailFinish = () => {
        if(title && imageSrc && description && tags && contentFile) {
            setPage(2)
        } else {
            setGeneralError('Pleas fill all required fiels!')
        }
    }
    const onCustomizeBackButtonClicked = () => setPage(1)

    const onPostCreationFinished = async () => {
        if(submiting) return

        if(!(actionBUttonTextColor && actionButtonColor && actionButtonLink && actionButtonText)) {
            setGeneralError('Please fill all required fields!')
            return
        }

        setSubmiting(true)
        try {
            let result = null
            if(isEdit) {
                let id = postID
                if(typeof postID === typeof [])
                {
                    id = postID[0]
                }
                // @ts-ignore
                result = await editPost(id,title,description,tags,
                    imageSrcChanged?imageSrc:null,
                    actionBUttonTextColor, actionButtonColor, actionButtonLink, actionButtonText,
                    actionInfoBackgroundColor,
                    hasShadow, autoPlay,
                    backGroundImageChanged?postBackgroundImageBase64:null, 
                    contentFileChanged?contentFile:null,
                    setUploadStatus)
            } else {
                result = await savePost(title,description,tags,imageSrc,
                    actionBUttonTextColor, actionButtonColor, actionButtonLink, actionButtonText,
                    actionInfoBackgroundColor,
                    hasShadow, autoPlay,
                    postBackgroundImageBase64, contentFile,setUploadStatus)

            }
            setSubmiting(false)
            if (result.success)
            {
                router.push('/profile')
            } else {
                setGeneralError(result.error?result.error:'')
            } 
        } catch(error) {
                setGeneralError(error)
                setSubmiting(false)
        }
    }

    return (<div className={styles.root}>
        <Navbar />
        <div className={styles.bodyContainer}>
        {!submiting ?
            <>
                <div className={styles.form}>
                    {page===1?<ARStudioPostDetail
                            error={generalError}
                            imageSrc={imageSrc}
                            setImageSrc={(image : string) => {setImageSrc(image);setImageSrcChanged(true)}}
                            contentFile={contentFile}
                            setContentFile={(contentFile : any) => {setContentFile(contentFile);setContentFileChanged(true)}}
                            description={description}
                            setDescription={setDescription}
                            tags={tags}
                            setTags={setTags}
                            title={title}
                            setTitle={setTitle}
                            onFinish={onPostDetailFinish}
                            buttonText='Next'
                        />:null}
                    {page===2?<ARStudioCustomize
                            autoPlay={autoPlay}
                            setAutoPlay={setAutoPlay}
                            hasShadow={hasShadow}
                            setHasShadow={setHasShadow}
                            hasBackground={hasBackground}
                            setHasBackground={setHasBackground}
                            actionInfoBackgroundColor={actionInfoBackgroundColor}
                            setActionInfoBackgroundColor={setActionInfoBackgroundColor}
                            actionBUttonTextColor={actionBUttonTextColor}
                            actionButtonColor={actionButtonColor}
                            actionButtonLink={actionButtonLink}
                            actionButtonText={actionButtonText}
                            setActionBUttonTextColor={setActionBUttonTextColor}
                            setActionButtonColor={setActionButtonColor}
                            setActionButtonLink={setActionButtonLink}
                            setActionButtonText={setActionButtonText}
                            backButtonText='back'
                            buttonText={isEdit?'Save changes':'Create AR'}
                            error={generalError}
                            onBack={onCustomizeBackButtonClicked}
                            onFinish={onPostCreationFinished}
                            postBackgroundImageBase64={postBackgroundImageBase64}
                            setPostBackgroundImageBase64={(src : string) => {setPostBackgroundImageBase64(src);setBackgroundImageChanged(true)}}
                            />:null}
                </div>
                <div className={styles.previewWrapper}>
                    <Preview
                        autoPlay={autoPlay}
                        backgrounImage={hasBackground?postBackgroundImageBase64:''}
                        buttonColor={actionButtonColor}
                        buttonText={actionButtonText}
                        buttonTextColor={actionBUttonTextColor}
                        contentFile={contentFile}
                        hasShadow={hasShadow}
                        infoBackgroundColor={actionInfoBackgroundColor}
                        link={actionButtonLink}
                        poster={imageSrc}
                    />
                </div> 
            </>
            :
            <ARStudioProgress
                title={'ARize is processing your data ...'}
                description={uploadStatus}
                progress={0}
            />}
        </div>   
    </div>)
}

export default ARStudio