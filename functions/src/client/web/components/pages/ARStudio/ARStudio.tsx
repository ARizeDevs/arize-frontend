import React , { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'


import firebase, { getDirectURL } from '../../../config/firebase'
// import ModelViewer from '../ModelViewer'
import Preview from '../../common/Preview'
import SolidButton from '../../common/buttons/SolidButton'
import ARStudioPostDetail from '../../common/ARStudioPostDetail'
import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg'
import CrossIcon from '../../../../assets/icons/cross.svg'
import { savePost, getPost, deletePost} from '../../../API/posts'
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
import { editPost } from '../../../API/posts'
import ModelViewer from '../ModelViewer'
import TextSwitch from '../../common/inputs/TextSwitch'
import toDataURL from '../../../helpers/toDataURL'
import ARStudio3DChoosing from '../../common/ARStudio3DChoosing'
import TDGalleryList from '../../common/TDGalleryList'
import useDebounce from '../../../helpers/useDebounce'
import { getAllTDGallery } from '../../../API/tdGallery'
import createFileFromURL from '../../../helpers/createFileFromURL'

interface IProps {
    isEdit? : boolean,
    postID? : string | string[]
}

const ARStudio = (props : IProps) => {

    const { isEdit, postID } = props
    
    const { addToast } = useToasts()
    const router = useRouter()

    const [ submiting , setSubmiting ] = useState(false)
    const [ fetchingData, setFetchingData ] = useState(false)
    const [ savedPostID, setSavedPostID ] = useState<string | null>(null)

    const [ page, setPage ] = useState(1)
    const [ imageSrc , setImageSrc ] = useState('')

    const [ imageSrcChanged, setImageSrcChanged] = useState(false)
    const [ backGroundImageChanged, setBackgroundImageChanged ] = useState(false)
    const [ contentFileChanged, setContentFileChanged] = useState(false)

    const [ hasShareButton, setHasShareButton ] = useState(false)
    const [ shareButtonBackgroundColor, setShareButtonBackgroundColor] = useState('#000000')
    const [ shareButtonTextColor, setShareButtonTextColor]  = useState('#FFFFFF')

    const [ hasARButton, setHasARButton ] = useState(true)
    const [ arButtonBackgroundColor, setArButtonBackgroundColor] = useState('#0078FF')
    const [ arButtonTextColor, setArButtonTextColor] = useState('#FFFFFF')

    const [ exposure, setExposure ] = useState(10)
    const [ shadowIntensity, setShadowIntensity ] = useState(10)
    const [ shadowSoftness, setShadowSoftness ] = useState(10)

    const [ title , setTitle ] = useState('')
    const [ titleChanged, setTitleChanged ] = useState(false)
    const [ description , setDescription ] = useState('')
    const [ descriptionChanged, setDescriptionChanged ] = useState(false)
    const [ tags , setTags ] = useState<string[]>([])
    const [ tagsChanged, setTagsChanged ] = useState(false)
    const [ contentFile , setContentFile ] = useState<any>(null)
    // const [ hasSolidBackground, setHasSolidBackground ] = useState(true)
    const [ solidBackgroundColor, setSolidBackgroundColor ] = useState('#FFFFFF')
    const [ hasShadow, setHasShadow ] = useState(false)
    const [ autoPlay, setAutoPlay ] = useState(true) 
    const [ hasSkyBox, setHasSkyBox ] = useState(false)
    const [ allowScaling, setAlloScaling ] = useState(false)
    const [ postBackgroundImageBase64, setPostBackgroundImageBase64] = useState('')
    const [ hasWaterMark, setHasWaterMark ] = useState(true)
    const [ waterMarkBase64, setWaterMarkBase64 ] = useState('')
    const [ waterMarkChanged, setWaterMarkChanged ] = useState(false)
    const [ error, setError ] = useState({})
    const [ isOnTheGroundChanged, setIsOnTheGroundChanged ] = useState(false)
    const [ desktop,setDesktop]= useState(false)
    
    const [ all3DItemsFetched, setAll3DItemsFetched ] = useState(false)
    const [ fetching3DItems, setFetching3DItems ] = useState(false)
    const [ TDItems, setTDItems ] = useState<any>([])
    const [ selectedTDItem, setSelectedTDItem ] = useState<any>(null)

    const scrollObject = useRef(null);
    const TDItemsPageSize = 6
    // const [ fullScreen, setFullScreen ] = useState(false)

    // const [ profilePicSrc, setProfilePicSrc ] = useState('')
    const [ userId, setUserId ] = useState('')
    const [ isOnTheGround,setIsOnTheGround ]= useState(true)

    // const [ skyBoxHDRFile, setSkyBoxHDRFile ] = useState<File | null>()

  const loadMoreTDItems = useDebounce( (items : any[], setItems : (items : any[], newItems : any[]) => void) => {
      setFetching3DItems(true)
      getAllTDGallery(null, items.length, TDItemsPageSize, null)
        .then((result : any) => {

            const newItems = result.data.data

            console.log(newItems);
            
            if((newItems as any).length < TDItemsPageSize) {               
              setAll3DItemsFetched(true)
            }

            setItems(items, newItems)
        })
        .catch((error : any) => {
            console.log(error)
        })
        .finally(() => {
          setFetching3DItems(false)
        })
    } , 500)

    const onScroll = (e : any) => {
      const scrollY = e.target.scrollTop
      
      const limit = e.target.scrollHeight - e.target.offsetHeight - 100
      
      console.log(limit);
      console.log(scrollY);
      

      if(scrollY !== 0) {
          if(limit < scrollY ) {

              if(!fetchingData  && !fetching3DItems ) {
                      if(!all3DItemsFetched) {
                          setFetching3DItems(true)
                          
                          const set = (items : any[] , newItems : any[]) => setTDItems([...items,...newItems.reverse()])
                          loadMoreTDItems(TDItems, set)
                      }
              }
          }
          // setShowGoToTop(true)
      } else {
          // setShowGoToTop(false)
      }
  }


    const validateAndSet = (fn : (arg : any) => void, validate : (arg : any) => any) => {
        return (value : any) => {
            fn(value)
            const result = validate(value)
            setError({...error,...result})
        }
    }

    useEffect(() => {
      console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      
        try {
          const set = (items : any[] , newItems : any[]) => setTDItems([...items,...newItems.reverse()])
          loadMoreTDItems(TDItems, set)
          
        } catch (error) {
          console.log(error);
          
        }

            

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
                  setFetchingData(true)

                    let id = postID
                    if(postID && typeof postID === typeof [])
                    {
                        id = postID[0]
                    }
                    const post = await getPost(id as string, true)
                    if(post && post.data){
                        const postData = post.data.data
                        setTitle(postData.title)
                        getDirectURL(postData.imageURL).then((url) => setImageSrc(url))
                        setDescription(postData.description)
                        setTags(postData.tags.split(','))
                        setAutoPlay(postData.autoPlay)
                        
                        setHasShadow(postData.hasShadow)
                        if(postData.hasShadow) {
                            setShadowIntensity(postData.shadowIntensity * 10)
                            setShadowSoftness(postData.shadowSoftness * 10)
                        }
                        
                        setHasARButton(postData.hasARButton)
                        if(postData.hasARButton) { 
                            setArButtonTextColor(postData.arButtonTextColor)
                            setArButtonBackgroundColor(postData.arButtonBackgroundColor)
                        } else {
                            setHasARButton(true);
                        }

                        setHasShareButton(postData.hasShareButton)
                        if(postData.hasShareButton) { 
                            setShareButtonTextColor(postData.shareButtonTextColor)
                            setShareButtonBackgroundColor(postData.shareButtonBackgroundColor)
                        } else {
                            setHasShareButton(false);
                        }

                        if(postData.solidBackgroundColor) {
                            setSolidBackgroundColor(postData.solidBackgroundColor)
                        }

                        if(postData.placement === 'ON_THE_GROUND') {
                            setIsOnTheGround(true)
                        } else if(postData.placement === "ON_THE_WALL"){
                            setIsOnTheGround(false) 
                        } else{
                            setIsOnTheGround(true);
                        }

                        setExposure(postData.exposure * 10)

                        if(postData.allowScaling) setAlloScaling(postData.allowScaling)
                        getDirectURL(postData.glbFileURL).then((url) => setContentFile(url))
                        if(postData.backGroundImage) {
                            // const patt = /\.([0-9a-z]+)(?:[\?#]|$)/i
                            // const isHDR = (postData.backGroundImage).match(patt)
                            getDirectURL(postData.backGroundImage).then((url) => {
                                setPostBackgroundImageBase64(url)
                                // if(!isHDR) setPostBackgroundImageBase64(url)
                                // else setSkyBoxHDRFile(url)
                            })
                            
                            setHasSkyBox(true)
                        } else {
                            setHasSkyBox(false)
                        }

                        if(postData.waterMarkImage) {
                            getDirectURL(postData.waterMarkImage).then((url : string) => setWaterMarkBase64(url)).catch((error) => console.log(error))
                            setHasWaterMark(true)
                        } else {
                            setHasWaterMark(false)
                            toDataURL('/images/logo black new.png').then((data : any) => setWaterMarkBase64(data)).catch((error) => console.log(error))
                        }
                    }
                } catch (error) {
                } finally {
                    setFetchingData(false)
                }
            } else {
                toDataURL('/images/logo black new.png').then((data : any) => setWaterMarkBase64(data)).catch((error) => console.log(error))
            }
        }
        getInitData()
    } , [isEdit,postID])


    const submitPosition = () => setPage(isEdit?4:2)
    const onCustomizeBackButtonClicked = () => {setPage(1);setDesktop(false);}
    
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
                let id : string = postID as string
                if(postID && typeof postID === typeof [])
                {
                    id = postID[0]
                }
                if(titleChanged || descriptionChanged || tagsChanged || imageSrcChanged 
                    || isOnTheGroundChanged || contentFileChanged) {
                        result = await editPost(
                            id, title, description, tags, imageSrcChanged?imageSrc:null,
                            null, null,null, null, null, null,null, null, null, null,
                            null,  isOnTheGround, null, null, null, contentFileChanged?contentFile:null,
                            null
                        )
                } else {
                    setSubmiting(false)
                    setPage(5)
                    return
                }
                
            } else {
                result = await savePost(
                    title, description, tags, hasShadow,
                    (shadowIntensity/10).toString(), (shadowSoftness/10).toString(), hasARButton,
                    arButtonBackgroundColor, arButtonTextColor,
                    hasShareButton, shareButtonBackgroundColor,
                    shareButtonTextColor, allowScaling, (exposure/10).toString(),
                    solidBackgroundColor, isOnTheGround, autoPlay,
                    imageSrc, hasSkyBox?postBackgroundImageBase64:'', contentFile,
                    hasWaterMark?waterMarkBase64:''
                )
            }

            setSubmiting(false)
            if (result && result.success)
            {
                if(!isEdit) {
                    // @ts-ignore
                    setSavedPostID(result.data.id)
                }

                // @ts-ignore
                getDirectURL(result.data.glbFileURL).then((url : string) => setContentFile(url))
                firebase.analytics().logEvent('creation_success', { user : userId } )
                setPage(5)
            } else {
                firebase.analytics().logEvent('creation_failed', { user : userId } )
                addToast('Something went wrong',{ appearance : 'error' })
            } 
        } catch(error) {
            console.log(error);
            
            firebase.analytics().logEvent('creation_failed', { user : userId } )
            addToast('Something went wrong',{ appearance : 'error' })
            // setGeneralError(error)
            setSubmiting(false)
        }

    }
    
    const onPostCreationPhase2 = async () => {
        if(submiting) return

        const errorResult = validateCustomizationDetail(
            hasSkyBox,
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
            let id : string = ''
            if(isEdit) {
                id = postID as string
                if(postID && typeof postID === typeof [])
                {
                    id = postID[0]
                }
            } else {
                id = savedPostID?savedPostID:''
            }
            result = await editPost(
                id, null, null, null, null, hasShadow, (shadowIntensity/10).toString(), (shadowSoftness/10).toString(),
                hasARButton, arButtonTextColor, arButtonBackgroundColor,
                hasShareButton, shareButtonBackgroundColor, shareButtonTextColor, allowScaling,
                (exposure/10).toString(), isOnTheGround, solidBackgroundColor, autoPlay, 
                hasSkyBox?(backGroundImageChanged?postBackgroundImageBase64:null):'',
                null, hasWaterMark?(waterMarkChanged?waterMarkBase64 : null):'',
                // backGroundImageChanged?(hasSkyBox?skyBoxHDRFile:''):null
            )

            setSubmiting(false)
            if (result && result.success)
            {
                firebase.analytics().logEvent('creation_success', { user : userId } )
                router.push('/profile')
            } else {
                firebase.analytics().logEvent('creation_failed', { user : userId } )
                addToast('Something went wrong',{ appearance : 'error' })
            } 
        } catch(error) {
            firebase.analytics().logEvent('creation_failed', { user : userId } )
            addToast('Something went wrong',{ appearance : 'error' })
            // setGeneralError(error)
            setSubmiting(false)
        }
    }

    const onCancelClick = async () => {
        if(savedPostID) {
            try {
                setSubmiting(true)
                await deletePost(savedPostID)
            } catch(error) {
                console.log(error)
            } finally {
                setSubmiting(false)
                router.push('/profile')
            }
        } else {
            router.push('/profile')
        }
    }

    return (
    <div className={styles.root}>    
        <div className={styles.bodyContainer}>
            <div className={styles.column}>
            {page===1?<div className={styles.topBar}>
                <div  onClick={onCancelClick} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start', marginRight:'50px'}}>
                    <div style={{width:'16px',marginRight:'16px',marginTop:'6px'}}>
                        {/* @ts-ignore */}
                        <CrossIcon fill='black'/>
                    </div>
                        <p style={{display:'flex',fontWeight:'bold',alignSelf:'center'}}>Cancel</p>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                </div>
                {/* <TextSwitch disabled={true} text1='Mobile' text2='Desktop' isOn={desktop} setIsOn={setDesktop}/> */}
            </div>:null}
            {page===2?<div className={styles.topBar}>
                <div  onClick={() => {setPage(1);setDesktop(false)}} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start', marginRight:'50px'}}>
                    <div style={{width:'16px',marginRight:'16px'}}>
                        {/* @ts-ignore */}
                        <ArrowLeftIcon fill='black'/>
                    </div>
                        <p style={{display:'flex',fontWeight:'bold',alignSelf:'center'}}>Back</p>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                    </div>
                        <TextSwitch disabled={false} text1='Mobile' text2='Desktop' isOn={desktop} setIsOn={setDesktop}/>
                    </div>:null}
            {page===3?<div className={styles.topBar}>
                <div  onClick={() => setPage(2)} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start', marginRight:'50px'}}>
                    <div style={{width:'16px',marginRight:'16px'}}>
                        {/* @ts-ignore */}
                        <ArrowLeftIcon fill='black'/>
                    </div>
                        <p style={{display:'flex',fontWeight:'bold',alignSelf:'center'}}>Back</p>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                    </div>
                    <TextSwitch disabled={false} text1='Mobile' text2='Desktop' isOn={desktop} setIsOn={setDesktop}/>
                    </div>:null}
            {page===4?<div className={styles.topBar}>
                <div  onClick={() => setPage(isEdit?1:2)} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start', marginRight:'50px'}}>
                    <div style={{width:'16px',marginRight:'16px'}}>
                        {/* @ts-ignore */}
                        <ArrowLeftIcon fill='black'/>
                    </div>
                    <p style={{display:'flex',fontWeight:'bold',alignSelf:'center'}}>Back</p>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                </div>
                    <TextSwitch disabled={false} text1='Mobile' text2='Desktop' isOn={desktop} setIsOn={setDesktop}/>
                </div>:null}
            {page===5?<div className={styles.topBar}>
                <div  onClick={() => setPage(4)} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start', marginRight:'50px'}}>
                    <div style={{width:'16px',marginRight:'16px'}}>
                        {/* @ts-ignore */}
                        <ArrowLeftIcon fill='black'/>
                    </div>
                    <p style={{display:'flex',fontWeight:'bold',alignSelf:'center'}}>Back</p>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                </div>
                    <TextSwitch disabled={false} text1='Mobile' text2='Desktop' isOn={desktop} setIsOn={setDesktop}/>
            </div>:null}
                    
                    
            {!desktop && <div className={styles.previewWrapperMobile}>
                <Preview
                    page={page}
                    hasSkybox={hasSkyBox}
                    hasWaterMark={hasWaterMark}
                    waterMarkBase64={isEdit?waterMarkBase64:page===3 ?waterMarkBase64:''}
                    // hasSolidBackground={hasSolidBackground}
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
                    id={postID? postID as string : (savedPostID?savedPostID:'') }
                    exposure={exposure}
                    postTitle={title}
                    autoPlay={autoPlay}
                    isOnTheGround={isOnTheGround}
                    backgrounImage={hasSkyBox?postBackgroundImageBase64:''}
                    contentFile={contentFile}
                    hasShadow={hasShadow}
                    poster={imageSrc}
                />
            </div>}
            {desktop && <div className={styles.previewWrapperDesktop}> 
                <ModelViewer
                        hasWaterMark={page===3?hasWaterMark:false}
                        waterMarkBase64={hasWaterMark ?(isEdit?waterMarkBase64:(page===3 ?waterMarkBase64:undefined)):undefined}
                        arButtonTextColor={arButtonTextColor}
                        arButtonBackgroundColor={arButtonBackgroundColor}
                        hasARButton={hasARButton}
                        hasShadow={hasShadow}
                        hasShareButton={hasShareButton}
                        shareButtonBackgroundColor={shareButtonBackgroundColor}
                        shareButtonTextColor={shareButtonTextColor}
                        solidBackgroundColor={solidBackgroundColor}
                        shadowIntensity={(shadowIntensity/10).toString()}
                        shadowSoftness={(shadowSoftness/10).toString()}
                        exposure={(exposure/10).toString()}
                        allowScaling={allowScaling}
                        showQR={true}
                        id={isEdit?postID as string:(savedPostID?savedPostID:'')}
                        title={title}
                        autoPlay={autoPlay}
                        glbURL={typeof window !== "undefined" && contentFile ?  (typeof contentFile !== "string"? window.URL.createObjectURL(contentFile) : contentFile ):''}
                        backgroundImage={hasSkyBox?postBackgroundImageBase64:''}
                        poster={imageSrc}
                        showShare={true}
                        usdzURL={''}
                    />
                </div>}
            </div>
                
                
        {page===1? // Template Choosing
            <div className={styles.form}>
                <div className={styles.cust}>
                    <div className={styles.inner} style={{width:'100%'}}>
                        <div className={styles.inputWrapper}>
                            <div>
                                <Placement isOnTheGround={isOnTheGround} setIsOnTheGround={(value : boolean) => { setIsOnTheGround(value);setIsOnTheGroundChanged(true)}}/>
                            </div>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <SolidButton onClick={submitPosition} ><h3>Next</h3></SolidButton>
                        </div>
                    </div>
                </div>
            </div>:null}
                        
        {page===2? // 3D Option Choosing
            <div className={styles.form}>
            <div className={styles.cust}>
                <div className={styles.inner}>
                    <ARStudio3DChoosing
                        on3DModelExist ={() => {setPage(4)}}
                        OnLibraryChosen= {() => {setPage(3)}}
                    />
                </div>
            </div>
        </div>:null}

        {page===3? // ARize Library
            <div className={styles.form}>
            <div className={styles.cust}>
                <div className={styles.inner}>
                <p style={{fontSize:16, fontWeight:900}}> Choose a 3D model</p>
                <br></br>
                <TDGalleryList selected={selectedTDItem} onChange={async (item : any) => {
                
                  setSelectedTDItem(item)
                  const contentFileDirectURL = await getDirectURL(item.glbFileURL)
                  const imageSrcDirectURL = await getDirectURL(item.imageURL)

                  const file : any = await createFileFromURL(contentFileDirectURL)
                  setContentFile(file)
                  // setContentFileChanged(true)
                  setImageSrc(await toDataURL(imageSrcDirectURL) as string)
                }} scrollRef={scrollObject} onScroll={onScroll} itemList={TDItems} fetchingItems={fetching3DItems} />
                <br></br>
                <SolidButton onClick={async ()=>{
                  if(selectedTDItem) {
                    
                    setPage(4)
                  } 
                }}><h3>Next</h3></SolidButton>
                </div>
            </div>
        </div>:null}

        {page===4? // Post Detailes
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
                        setDescription={(value : string) => { setDescription(value);setDescriptionChanged(true) }}
                        tags={tags}
                        setTags={validateAndSet((value : string[]) => {setTags(value);setTagsChanged(true)}, tagsValidator)}
                        title={title}
                        setTitle={validateAndSet((value : string) => { setTitle(value);setTitleChanged(true) }, titleValidator)}
                        onFinish={onPostCreationPhase1}
                        buttonText='Next'
                    />
                </div>
            </div>
        </div>:null}

        {page===5? // All 3D detailes
        <div className={styles.form}>
            <div className={styles.cust}>
                <div className={styles.inner}>
                    <ARStudioCustomize
                        // hdrFile={skyBoxHDRFile}
                        // setHDRFile={(file : any) => {setSkyBoxHDRFile(file);setBackgroundImageChanged(true)}}
                        hasWaterMark={hasWaterMark}
                        setHasWaterMark={(value : boolean) =>{setHasWaterMark(value); setWaterMarkChanged(true)}}
                        waterMarkBase64={waterMarkBase64}
                        setWaterMarkBase64={(value : string) => { setWaterMarkBase64(value); setWaterMarkChanged(true)}}
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
                        // solidBackground={hasSolidBackground}
                        // setSolidBackground={setHasSolidBackground}
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
                        hasSkyBox={hasSkyBox}
                        setHasSkyBox={setHasSkyBox}
                        hasShadow={hasShadow}
                        setHasShadow={setHasShadow}
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