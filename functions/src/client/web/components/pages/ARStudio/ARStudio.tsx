import React , { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


import firebase, { getDirectURL } from '../../../config/firebase'
import Navbar from '../../common/Navbar'
import Preview from '../../common/Preview'
import ARStudioPostDetail from '../../common/ARStudioPostDetail'
import { savePost, getPost, editPost } from '../../../API'
import { contentFileValidator, imageSrcValidator, tagsValidator,
     titleValidator, validatePostDetail, actionBUttonTextColorValidator,
    actionButtonColorValidator, actionButtonInfoTextValidator,
    actionButtonLinkValidator, actionButtonTextValidator,
    actionInfoBackgroundColorValidator, postBackgroundImageBase64Validator,
    validateCustomizationDetail, } from './validators'

import styles from './ARStudio.module.css'
// import ARStudioProgress from '../../common/ARStudioProgress'
import ARStudioCustomize from '../../common/ARStudioCustomize'
import Loading from '../../common/Loading'
import { getUser } from '../../../API/user'

interface IProps {
    isEdit? : boolean,
    postID? : string | string[]
}

const ARStudio = (props : IProps) => {

    const { isEdit, postID, } = props

    const router = useRouter()

    const [ submiting , setSubmiting ] = useState(false)
    const [ fetchingData, setFetchingData ] = useState(true)
    // const [ generalError , setGeneralError ] = useState('')

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
    const [ hasCallToAction, setHasCallToAction ] = useState(false)
    // const [ uploadStatus, setUploadStatus ] = useState('')
    const [ actionBUttonTextColor, setActionBUttonTextColor] = useState('#FFFFFF')
    const [ actionButtonColor, setActionButtonColor] = useState('#FF6F48')
    const [ actionButtonInfoText, setActionButtonInfoText ] = useState('')
    const [ actionButtonLink, setActionButtonLink] = useState('')
    const [ actionButtonText, setActionButtonText] = useState('')
    const [ hasShadow, setHasShadow ] = useState(false)
    const [ autoPlay, setAutoPlay ] = useState(false) 
    const [ hasBackground, setHasBackground ] = useState(true)
    const [ actionInfoBackgroundColor, setActionInfoBackgroundColor] = useState('#141323')
    const [ postBackgroundImageBase64, setPostBackgroundImageBase64] = useState('')
    const [ error, setError ] = useState({})

    const [ profilePicSrc, setProfilePicSrc ] = useState('')

    const validateAndSet = (fn : (arg : any) => void, validate : (arg : any) => any) => {
        return (value : any) => {
            fn(value)
            const result = validate(value)
            setError({...error,...result})
        }
    }

    useEffect(() => {
        const getInitData = async () => {
            try {
                const user = await getUser(false, null)
                if(user && user.data.data){
                    const userData = user.data.data
                    if(userData.profilePicURL) {
                        getDirectURL(userData.profilePicURL).then((url : string) => {
                            setProfilePicSrc(url)
                        })
                    }
                }
            } catch(error : any) {
                console.log(error)
            }

            if(isEdit && postID) {
                try {
                    let id = postID
                    if(postID && typeof postID === typeof [])
                    {
                        id = postID[0]
                    }
                    const post = await getPost(id as string, true)
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
                        setAutoPlay(postData.autoPlay)
                        setHasShadow(postData.hasShadow)
                        setActionButtonInfoText(postData.actionButtonInfoText)
                        setActionInfoBackgroundColor(postData.actionInfoBackgroundColor)
                        firebase.storage().ref(postData.glbFileURL).getDownloadURL().then((url) => setContentFile(url))
                        if(postData.backGroundImage) firebase.storage().ref(postData.backGroundImage).getDownloadURL().then((url) => setPostBackgroundImageBase64(url))
                        if(!postData.backGroundImage) setHasBackground(false)
                        
                    }
                } catch (error) {
                } finally {
                    setFetchingData(false)
                }
            }
        }
        getInitData()
    } , [isEdit,postID])

    const onPostDetailFinish = () => {
        const errorResult = validatePostDetail(title, tags, imageSrc, contentFile)
        setError(errorResult)
        
        let anyError = false
        Object.values(errorResult).forEach((value) => {
            if(value) anyError = true
        })
            
        if(!anyError) setPage(2)
    }

    const onCustomizeBackButtonClicked = () => setPage(1)
    
    const onPostCreationFinished = async () => {
        if(submiting) return

        const errorResult = validateCustomizationDetail(
            hasCallToAction,
            actionButtonLink,
            actionButtonText,
            actionBUttonTextColor,
            actionButtonColor,
            actionButtonInfoText,
            actionInfoBackgroundColor,
            hasBackground,
            postBackgroundImageBase64
        )

        setError(errorResult)
        
        let anyError = false
        Object.values(errorResult).forEach((value) => {
            if(value) anyError = true
        })
        if(anyError) return


        setSubmiting(true)
        try {
            let result = null
            if(isEdit) {
                let id = postID
                if(postID && typeof postID === typeof [])
                {
                    id = postID[0]
                }
                // @ts-ignore
                result = await editPost(id,title,description,tags,
                    imageSrcChanged?imageSrc:null,
                    actionBUttonTextColor, actionButtonColor, actionButtonLink, actionButtonText,
                    actionInfoBackgroundColor,
                    hasShadow, autoPlay,
                    actionButtonInfoText,
                    hasCallToAction,
                    backGroundImageChanged?postBackgroundImageBase64:null, 
                    contentFileChanged?contentFile:null,
                    (status : string) => '')
            } else {
                result = await savePost(title,description,tags,imageSrc,
                    actionBUttonTextColor, actionButtonColor, actionButtonLink, actionButtonText,
                    actionInfoBackgroundColor,
                    hasShadow, autoPlay,
                    actionButtonInfoText,
                    hasCallToAction,
                    postBackgroundImageBase64, contentFile, (status : string) => '')

            }
            setSubmiting(false)
            if (result.success)
            {
                router.push('/profile')
            } else {
                // setGeneralError(result.error?result.error:'')
            } 
        } catch(error) {
                // setGeneralError(error)
                setSubmiting(false)
        }
    }

    return (<div className={styles.root}>
        <Navbar imageSrc={profilePicSrc} />
        <div className={styles.bodyContainer}>
        {/* {!submiting ? */}
            <>
                <div className={styles.form}>
                    {page===1?<ARStudioPostDetail
                            error={error}
                            imageSrc={imageSrc}
                            setImageSrc={validateAndSet((image : string) => {setImageSrc(image);setImageSrcChanged(true)},imageSrcValidator)}
                            contentFile={contentFile}
                            setContentFile={validateAndSet((contentFile : any) => {setContentFile(contentFile);setContentFileChanged(true)}, contentFileValidator)}
                            description={description}
                            setDescription={setDescription}
                            tags={tags}
                            setTags={validateAndSet(setTags, tagsValidator)}
                            title={title}
                            setTitle={validateAndSet(setTitle, titleValidator)}
                            onFinish={onPostDetailFinish}
                            buttonText='Next'
                        />:null}
                    {page===2?<ARStudioCustomize
                            hasCallToAction={hasCallToAction}
                            setHasCallToAction={setHasCallToAction }
                            actionButtonInfoText={actionButtonInfoText}
                            setActionButtonInfoText={validateAndSet(setActionButtonInfoText, actionButtonInfoTextValidator)}
                            autoPlay={autoPlay}
                            setAutoPlay={setAutoPlay}
                            hasShadow={hasShadow}
                            setHasShadow={setHasShadow}
                            hasBackground={hasBackground}
                            setHasBackground={setHasBackground}
                            actionInfoBackgroundColor={actionInfoBackgroundColor}
                            setActionInfoBackgroundColor={validateAndSet(setActionInfoBackgroundColor, actionInfoBackgroundColorValidator)}
                            actionBUttonTextColor={actionBUttonTextColor}
                            actionButtonColor={actionButtonColor}
                            actionButtonLink={actionButtonLink}
                            actionButtonText={actionButtonText}
                            setActionBUttonTextColor={validateAndSet(setActionBUttonTextColor, actionBUttonTextColorValidator)}
                            setActionButtonColor={validateAndSet(setActionButtonColor, actionButtonColorValidator)}
                            setActionButtonLink={validateAndSet(setActionButtonLink, actionButtonLinkValidator)}
                            setActionButtonText={validateAndSet(setActionButtonText, actionButtonTextValidator)}
                            backButtonText='back'
                            buttonText={isEdit?'Save changes':'Create AR'}
                            error={error}
                            onBack={onCustomizeBackButtonClicked}
                            onFinish={onPostCreationFinished}
                            postBackgroundImageBase64={postBackgroundImageBase64}
                            setPostBackgroundImageBase64={validateAndSet((src : string) => {setPostBackgroundImageBase64(src);setBackgroundImageChanged(true)},postBackgroundImageBase64Validator)}
                            />:null}
                </div>
                <div className={styles.previewWrapper}>
                    <Preview
                        hasCallToAction={hasCallToAction}
                        id={''}
                        postTitle={title}
                        autoPlay={autoPlay}
                        backgrounImage={hasBackground?postBackgroundImageBase64:''}
                        buttonColor={actionButtonColor}
                        buttonText={actionButtonText}
                        buttonTextColor={actionBUttonTextColor}
                        contentFile={contentFile}
                        hasShadow={hasShadow}
                        infoBackgroundColor={actionInfoBackgroundColor}
                        infoText={actionButtonInfoText}
                        link={actionButtonLink}
                        poster={imageSrc}
                    />
                </div> 
            </>
            {/* :
            <ARStudioProgress
                title={'ARize is processing your data ...'}
                description={uploadStatus}
                progress={0}
            />} */}
            {isEdit && fetchingData ? <Loading text='Loading ...' />:null}
            {submiting ? <Loading text='Saving your new post ... '/>:null}
        </div>   
    </div>)
}

export default ARStudio