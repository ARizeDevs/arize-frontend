import React , { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


import firebase, { getDirectURL } from '../../../config/firebase'
import Navbar from '../../common/Navbar'
import ModelViewer from '../ModelViewer'
import Preview from '../../common/Preview'
import SolidButton from '../../common/buttons/SolidButton'
import ARStudioPostDetail from '../../common/ARStudioPostDetail'
import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg'
import CrossIcon from '../../../../assets/icons/cross.svg'
import { savePost, getPost, editPost } from '../../../API'
import { contentFileValidator, imageSrcValidator, tagsValidator,
     titleValidator, validatePostDetail, actionBUttonTextColorValidator,
    actionButtonColorValidator, actionButtonInfoTextValidator,
    actionButtonLinkValidator, actionButtonTextValidator,
    actionInfoBackgroundColorValidator, postBackgroundImageBase64Validator,
    validateCustomizationDetail, } from './validators'

import styles from './ARStudio.module.css'
import Placement from '../../common/inputs/Placement'
// import ARStudioProgress from '../../common/ARStudioProgress'
import ARStudioCustomize from '../../common/ARStudioCustomize'
import Loading from '../../common/Loading'
import { getUser } from '../../../API/user'
import { useToasts } from 'react-toast-notifications'
import Toggle from '../../common/inputs/Toggle'

interface IProps {
    isEdit? : boolean,
    postID? : string | string[]
}

const ARStudio = (props : IProps) => {

    const { isEdit, postID, } = props
    
    const { addToast } = useToasts()
    const router = useRouter()

    const [ submiting , setSubmiting ] = useState(false)
    const [ fetchingData, setFetchingData ] = useState(true)

    const [ page, setPage ] = useState(1)
    const [ imageSrc , setImageSrc ] = useState('')

    const [ imageSrcChanged, setImageSrcChanged] = useState(false)
    const [ backGroundImageChanged, setBackgroundImageChanged ] = useState(false)
    const [ contentFileChanged, setContentFileChanged] = useState(false)

    const [ title , setTitle ] = useState('')
    const [ description , setDescription ] = useState('')
    const [ tags , setTags ] = useState([])
    const [ contentFile , setContentFile ] = useState(null)
    const [ hasCallToAction, setHasCallToAction ] = useState(true)
    const [ solidBackground, setSolidBackground ] = useState(true)
    const [ actionBUttonTextColor, setActionBUttonTextColor] = useState('#FFFFFF')
    const [ actionButtonColor, setActionButtonColor] = useState('#0078FF')
    const [ actionButtonInfoText, setActionButtonInfoText ] = useState('')
    const [ solidBackgroundColor, setSolidBackgroundColor ] = useState('#FFFFFF')
    const [ actionButtonInfoTextColor, setActionButtonInfoTextColor ] = useState('#141323')
    const [ actionButtonLink, setActionButtonLink] = useState('')
    const [ actionButtonText, setActionButtonText] = useState('')
    const [ hasShadow, setHasShadow ] = useState(false)
    const [ autoPlay, setAutoPlay ] = useState(false) 
    const [ skyBox, setSkyBox ] = useState(false)
    const [ scaling, setScaling ] = useState(false)
    const [ shareButton, setShareButton ] = useState(true)
    const [ arButton, setArButton ] = useState(true)
    const [ hasBackground, setHasBackground ] = useState(false)
    const [ actionInfoBackgroundColor, setActionInfoBackgroundColor] = useState('#FFFFFF')
    const [ postBackgroundImageBase64, setPostBackgroundImageBase64] = useState('')
    const [ error, setError ] = useState({})
    const [ desktop,setDesktop]= useState(false)
    const [ fullScreen, setFullScreen ] = useState(false)

    const [ profilePicSrc, setProfilePicSrc ] = useState('')
    const [ userId, setUserId ] = useState('')

    const validateAndSet = (fn : (arg : any) => void, validate : (arg : any) => any) => {
        return (value : any) => {
            fn(value)
            const result = validate(value)
            setError({...error,...result})
        }
    }

    useEffect(() => {
    }, [])

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
                    setUserId(userData.id)
                    firebase.analytics().logEvent('creation_started', { user : userData.id } )
                }
            } catch(error) {
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
                        if(postData.actionBUttonTextColor) setActionBUttonTextColor(postData.actionBUttonTextColor)
                        if(postData.actionButtonColor) setActionButtonColor(postData.actionButtonColor)
                        setActionButtonLink(postData.actionButtonLink)
                        setActionButtonText(postData.actionButtonText)
                        setAutoPlay(postData.autoPlay)
                        if(postData.hasCallToAction) setHasCallToAction(postData.hasCallToAction)
                        setHasShadow(postData.hasShadow)
                        if(postData.arScale) setArScale(postData.arScale)
                        if(postData.actionButtonInfoText) setActionButtonInfoText(postData.actionButtonInfoText)
                        if(postData.actionButtonInfoTextColor) setActionButtonInfoTextColor(postData.actionButtonInfoTextColor)
                        if(postData.actionInfoBackgroundColor) setActionInfoBackgroundColor(postData.actionInfoBackgroundColor)
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

    const [value,setValue]= useState(false)

    const onPostDetailFinish = () => {
        const errorResult = validatePostDetail(title, tags, imageSrc, contentFile)
        setError(errorResult)
        
        let anyError = false
        Object.values(errorResult).forEach((value) => {
            if(value) anyError = true
        })
            
        if(!anyError) setPage(3)
    }

    const submitPosition = () => {
        setPage(2)
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
                    actionButtonInfoTextColor,
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
                    actionButtonInfoTextColor,
                    hasCallToAction,
                    postBackgroundImageBase64, contentFile, (status : string) => '')

            }
            setSubmiting(false)
            if (result.success)
            {
                firebase.analytics().logEvent('creation_success', { user : userId } )
                router.push('/profile')
            } else {
                firebase.analytics().logEvent('creation_failed', { user : userId } )
                addToast('Bad file format',{ appearance : 'error' })
            } 
        } catch(error) {
            firebase.analytics().logEvent('creation_failed', { user : userId } )
            addToast('Bad file format',{ appearance : 'error' })
            // setGeneralError(error)
            setSubmiting(false)
        }
    }
    const onFullScreenClick = () => setFullScreen(!fullScreen)

    return (<div className={styles.root}>
        
        <div className={styles.bodyContainer}>
        
            
        {/* {!submiting ? */}
            <>  
            <div className={styles.column}>
            {page===1?<div className={styles.topBar}>
                            <div  onClick={() => router.push('/profile')} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start'}}>
                                <div style={{width:'16px',marginRight:'8px'}}>
                                    {/* @ts-ignore */}
                                    <CrossIcon fill='black'/>
                                </div>
                                <p style={{display:'flex',fontWeight:'bold',alignSelf:'center'}}>Cancel</p>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                </div>
                                
                        </div>:null}
                        {page===2?<div className={styles.topBar}>
                            <div  onClick={() => setPage(1)} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start'}}>
                                <div style={{width:'16px',marginRight:'8px'}}>
                                    {/* @ts-ignore */}
                                    <ArrowLeftIcon fill='black'/>
                                </div>
                                <p style={{display:'flex',fontWeight:'bold',alignSelf:'center'}}>Back</p>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                </div>
                                <Toggle rightToggleLabel={true} active={desktop} text={'Desktop'} setActive={setDesktop}/>
                                
                        </div>:null}
                        {page===3?<div className={styles.topBar}>
                            <div  onClick={() => setPage(2)} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start'}}>
                                <div style={{width:'16px',marginRight:'8px'}}>
                                    {/* @ts-ignore */}
                                    <ArrowLeftIcon fill='black'/>
                                </div>
                                <p style={{display:'flex',fontWeight:'bold',alignSelf:'center'}}>Back</p>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                </div>
                                <Toggle rightToggleLabel={true} setActive={setDesktop}/>
                                
                        </div>:null}
                    <div className={styles.previewWrapper}>
                    {setDesktop && <Preview
                        buttnPreview={false}
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
                        infoTextColor={actionButtonInfoTextColor}
                        link={actionButtonLink}
                        poster={imageSrc}
                    />}
                    {desktop && <div className={styles.modelViewer }>
                    <ModelViewer
                        isFullScreen={fullScreen}
                        // onFullScreen={onFullScreenClick}
                    />
                </div>}
                    </div> 
                    </div>
                
                
                
                    {page===1?
                    <div className={styles.form}>
                    <div className={styles.cust}>
                    <div className={styles.inner} style={{width:'100%'}}>
                        <div>
                            <Placement isOnTheGround={value} setIsOnTheGround={setValue}/>
                             <div className={styles.buttonWrapper}>
                                <SolidButton onClick={submitPosition} ><h3>Next</h3></SolidButton>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        :null}
                        
                
                    {page===2?
                    <div className={styles.form}>
                    <div className={styles.cust}>
                    <div className={styles.inner}>
                        <ARStudioPostDetail
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
                        />
                        </div>
                        </div>
                        </div>
                        :null}
                        
                    {page===3?
                    <div className={styles.form}>
                    <div className={styles.cust}>
                    <div className={styles.inner}>
                        <ARStudioCustomize
                            solidBackgroundColor = {solidBackgroundColor}
                            setSolidBackgroundColor = {setSolidBackgroundColor}
                            actionButtonInfoTextColor={actionButtonInfoTextColor}
                            setActionButtonInfoTextColor={setActionButtonInfoTextColor}
                            solidBackground={solidBackground}
                            setSolidBackground={setSolidBackground}
                            scaling={scaling}
                            setScaling={setScaling}
                            shareButton={shareButton}
                            setShareButton={setShareButton}
                            arButton={arButton}
                            setArButton={setArButton}
                            actionButtonInfoText={actionButtonInfoText}
                            setActionButtonInfoText={validateAndSet(setActionButtonInfoText, actionButtonInfoTextValidator)}
                            autoPlay={autoPlay}
                            setAutoPlay={setAutoPlay}
                            skyBox={skyBox}
                            setSkyBox={setSkyBox}
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
                            />
                           
                        </div>
                        </div>
                        </div>
                        :null}
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