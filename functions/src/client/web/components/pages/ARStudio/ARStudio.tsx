import React , { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


import firebase, { getDirectURL } from '../../../config/firebase'
// import ModelViewer from '../ModelViewer'
import Preview from '../../common/Preview'
import SolidButton from '../../common/buttons/SolidButton'
import ARStudioPostDetail from '../../common/ARStudioPostDetail'
import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg'
import CrossIcon from '../../../../assets/icons/cross.svg'
import { savePost, getPost} from '../../../API'
import { contentFileValidator, imageSrcValidator, tagsValidator,
     titleValidator, validatePostDetail,postBackgroundImageBase64Validator,
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

    const [ hasShareButton, setHasShareButton ] = useState(true)
    const [ shareButtonBackgroundColor, setShareButtonBackgroundColor] = useState('#FFFFFF')
    const [ shareButtonTextColor, setShareButtonTextColor]  = useState('#FFFFFF')

    const [ hasARButton, setHasARButton ] = useState(true)
    const [ arButtonBackgroundColor, setArButtonBackgroundColor] = useState('#FFFFFF')
    const [ arButtonTextColor, setArButtonTextColor] = useState('#FFFFFF')

    const [ exposure, setExposure ] = useState('10')
    const [ shadowIntensity, setShadowIntensity ] = useState('10')
    const [ shadowSoftness, setShadowSoftness ] = useState('10')

    const [ title , setTitle ] = useState('')
    const [ description , setDescription ] = useState('')
    const [ tags , setTags ] = useState([])
    const [ contentFile , setContentFile ] = useState<any>(null)
    const [ solidBackground, setSolidBackground ] = useState(true)
    const [ solidBackgroundColor, setSolidBackgroundColor ] = useState('#FFFFFF')
    const [ hasShadow, setHasShadow ] = useState(false)
    const [ autoPlay, setAutoPlay ] = useState(false) 
    const [ skyBox, setSkyBox ] = useState(false)
    const [ allowScaling, setAlloScaling ] = useState(false)
    const [ hasBackground, setHasBackground ] = useState(false)
    const [ postBackgroundImageBase64, setPostBackgroundImageBase64] = useState('')
    const [ error, setError ] = useState({})
    const [ desktop,setDesktop]= useState(false)
    // const [ fullScreen, setFullScreen ] = useState(false)

    // const [ profilePicSrc, setProfilePicSrc ] = useState('')
    const [ userId, setUserId ] = useState('')
    const [ isOnTheGround,setIsOnTheGround ]= useState(false)

    const validateAndSet = (fn : (arg : any) => void, validate : (arg : any) => any) => {
        return (value : any) => {
            fn(value)
            const result = validate(value)
            setError({...error,...result})
        }
    }

    useEffect(() => {
        console.log(contentFileChanged)
        console.log(backGroundImageChanged)
        console.log(imageSrcChanged)
        
        
        
        const getInitData = async () => {
            try {
                const user = await getUser(null)
                if(user && user.data.data){
                    const userData = user.data.data
                    // if(userData.profilePicURL) {
                    //     getDirectURL(userData.profilePicURL).then((url : string) => {
                    //         setProfilePicSrc(url)
                    //     })
                    // }
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
                        setAutoPlay(postData.autoPlay)
                        setHasShadow(postData.hasShadow)
                        if(postData.allowScaling) setAlloScaling(postData.allowScaling)
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

    // const onFullScreenClick = () => setFullScreen(!fullScreen)

    const submitPosition = () => setPage(2)
    const onCustomizeBackButtonClicked = () => setPage(1)

    const onPostCreationPhase1 = async () => {
        const errorResult = validatePostDetail(title, tags, imageSrc, contentFile)
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
                console.log(id)
            } else {
                result = await savePost(
                    title, description, tags, hasShadow,
                    shadowIntensity, shadowSoftness, hasARButton,
                    arButtonBackgroundColor, arButtonTextColor,
                    hasShareButton, shareButtonBackgroundColor,
                    shareButtonTextColor, allowScaling, exposure,
                    solidBackgroundColor, isOnTheGround, autoPlay,
                    imageSrc, postBackgroundImageBase64, contentFile
                )
            }

            setSubmiting(false)
            if (result && result.success)
            {
                firebase.analytics().logEvent('creation_success', { user : userId } )
                setPage(3)
                getDirectURL(result.data.glbFileURL).then((url : string) => setContentFile(url))
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
    
    const onPostCreationPhase2 = async () => {
        if(submiting) return

        const errorResult = validateCustomizationDetail(
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
                console.log(id)
                // @ts-ignore
                // result = await editPost(id,title,description,tags,
                //     imageSrcChanged?imageSrc:null,
                //     actionBUttonTextColor, actionButtonColor, actionButtonLink, actionButtonText,
                //     actionInfoBackgroundColor,
                //     hasShadow, autoPlay,
                //     actionButtonInfoText,
                //     actionButtonInfoTextColor,
                //     backGroundImageChanged?postBackgroundImageBase64:null, 
                //     contentFileChanged?contentFile:null,
                //     (status : string) => '')
            } else {
                result = await savePost(
                    title, description, tags, hasShadow,
                    shadowIntensity, shadowSoftness, hasARButton,
                    arButtonBackgroundColor, arButtonTextColor,
                    hasShareButton, shareButtonBackgroundColor,
                    shareButtonTextColor, allowScaling, exposure,
                    solidBackgroundColor, isOnTheGround, autoPlay,
                    imageSrc, postBackgroundImageBase64, contentFile
                )
            }
            setSubmiting(false)
            if (result && result.success)
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

    return (
    <div className={styles.root}>    
        <div className={styles.bodyContainer}>
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
                                <Toggle active={desktop} text={'dsa'} rightToggleLabel={true} setActive={setDesktop}/>
                                
                        </div>:null}
                    <div className={styles.previewWrapper}>
                    {!desktop && <Preview
                        solidBackgroundColor={solidBackgroundColor}
                        shadowIntensity={shadowIntensity}
                        shadowSoftness={shadowSoftness}
                        arButtonBackgroundColor={arButtonBackgroundColor}
                        arButtonTextColor={arButtonTextColor}
                        hasARButton={hasARButton}
                        hasShareButton={hasShareButton}
                        shareButtonBackgroundColor={shareButtonBackgroundColor}
                        shareButtonTextColor={shareButtonTextColor}
                        allowScaling={allowScaling}
                        buttnPreview={false}
                        id={''}
                        exposure={exposure}
                        postTitle={title}
                        autoPlay={autoPlay}
                        backgrounImage={hasBackground?postBackgroundImageBase64:''}
                        contentFile={contentFile}
                        hasShadow={hasShadow}
                        poster={imageSrc}
                    />}
                    {/* {desktop && <ModelViewer
                        
                        solidBackgroundColor={solidBackgroundColor}
                        shadowIntensity={shadowIntensity}
                        shadowSoftness={shadowSoftness}
                        arButtonBackgroundColor={arButtonBackgroundColor}
                        arButtonTextColor={arButtonTextColor}
                        hasARButton={hasARButton}
                        hasShareButton={hasShareButton}
                        shareButtonBackgroundColor={shareButtonBackgroundColor}
                        shareButtonTextColor={shareButtonTextColor}
                        allowScaling={allowScaling}
                        id={''}
                        exposure={exposure}
                        autoPlay={autoPlay}
                        backgroundImage={hasBackground?postBackgroundImageBase64:''}
                        hasShadow={hasShadow}
                        poster={imageSrc}                   />
                    } */}
                    </div> 
                    </div>
                
                
                
        {page===1?
        <div className={styles.form}>
            <div className={styles.cust}>
                <div className={styles.inner} style={{width:'100%'}}>
                    <div className={styles.inputWrapper}>
                        <div>
                            <Placement isOnTheGround={isOnTheGround} setIsOnTheGround={setIsOnTheGround}/>
                        </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                            <SolidButton onClick={submitPosition} ><h3>Next</h3></SolidButton>
                    </div>
                </div>
            </div>
        </div>:null}
                        
                
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
                        onFinish={onPostCreationPhase1}
                        buttonText='Next'
                    />
                </div>
            </div>
        </div>:null}
                        
        {page===3?
        <div className={styles.form}>
            <div className={styles.cust}>
                <div className={styles.inner}>
                    <ARStudioCustomize
                        exposure={exposure}
                        setExposure={setExposure}
                        setShadowIntensity={setShadowIntensity}
                        setShadowSoftness={setShadowSoftness}
                        shadowIntensity={shadowIntensity}
                        shadowSoftness={shadowSoftness}
                        allowScaling={allowScaling}
                        setAllowScaling={setAlloScaling}
                        solidBackgroundColor = {solidBackgroundColor}
                        setSolidBackgroundColor = {setSolidBackgroundColor}
                        solidBackground={solidBackground}
                        setSolidBackground={setSolidBackground}
                        hasARButton={hasARButton}
                        arButtonBackgroundColor={arButtonBackgroundColor}
                        arButtonTextColor={arButtonTextColor}
                        hasShareButton={hasShareButton}
                        setARButtonBackgroundColor={setArButtonBackgroundColor}
                        setARButtonTextColor={setArButtonTextColor}
                        setHasARButton={setHasARButton}
                        setHasShareButton={setHasShareButton}
                        setShareButtonBackgroundColor={setShareButtonBackgroundColor}
                        setShareButtonTextColor={setShareButtonTextColor}
                        shareButtonBackgroundColor={shareButtonBackgroundColor}
                        shareButtonTextColor={shareButtonTextColor}
                        autoPlay={autoPlay}
                        setAutoPlay={setAutoPlay}
                        skyBox={skyBox}
                        setSkyBox={setSkyBox}
                        hasShadow={hasShadow}
                        setHasShadow={setHasShadow}
                        hasBackground={hasBackground}
                        setHasBackground={setHasBackground}
                        backButtonText='back'
                        buttonText={isEdit?'Save changes':'Create AR'}
                        error={error}
                        onBack={onCustomizeBackButtonClicked}
                        onFinish={onPostCreationPhase2}
                        postBackgroundImageBase64={postBackgroundImageBase64}
                        setPostBackgroundImageBase64={validateAndSet((src : string) => {setPostBackgroundImageBase64(src);setBackgroundImageChanged(true)},postBackgroundImageBase64Validator)}
                    />
                </div>
            </div>
        </div>:null}    
        {isEdit && fetchingData ? <Loading text='Loading ...' />:null}
        {submiting ? <Loading text='Saving your new post ... '/>:null}
    </div>   
</div>)
}

export default ARStudio