// @ts-nocheck
import React , { useState, useEffect } from 'react'

import QRModal from '../../common/QRModal'

import ARViewIcon from '../../../../assets/icons/arViewIcon.svg'
import ShareIcon from '../../../../assets/icons/share.svg'
import FocusIcon from '../../../../assets/icons/focus.svg'
import CompressIcon from '../../../../assets/icons/compress.svg'

import styles from './ModelViewer.module.css'
import SharePostModal from '../../common/SharePostModal'
import { sharePost, viewARPost } from '../../../API/posts'
import RoundImage from '../../common/RoundImage'

interface IProps {
    glbURL : string,
    usdzURL : string,
    title : string,
    id : string,

    hasShareButton : boolean,
    shareButtonBackgroundColor : string,
    shareButtonTextColor : string,

    hasARButton : boolean,
    arButtonBackgroundColor : string,
    arButtonTextColor : string,
    
    allowScaling : boolean,

    hasShadow : boolean,
    shadowIntensity : string,
    shadowSoftness : string,

    exposure : string,

    solidBackgroundColor : string,

    isOnTheWall? : boolean,

    backgroundImage : string,
    poster : string,
    autoPlay : boolean,
    showQR : boolean,

    showShare? : boolean,
    onFullScreen? : () => void,
    isFullScreen? : boolean,
    showBanner? : boolean,
    openar? : boolean

    hasWaterMark? : boolean,
    waterMarkBase64? : string
}

const ModelViewer = (props : IProps) => {
    const { title, openar, glbURL, backgroundImage, usdzURL, solidBackgroundColor,
            poster, allowScaling, exposure, autoPlay, id,  showQR, showShare, onFullScreen, 
            isFullScreen, hasARButton, hasShareButton, shareButtonBackgroundColor, shareButtonTextColor, 
            arButtonBackgroundColor, arButtonTextColor, hasShadow, shadowIntensity, shadowSoftness,
            hasWaterMark, waterMarkBase64, isOnTheWall
        } = props

    const [ qrModalOpen, setQRModalOpen ] = useState(false)
    const [ shareModalOpen, setShareModalOpen ] = useState(false)
    const [ isMobile, setIsMobile ] = useState(false)
    const [ shareAdded, setShareAdded ] = useState(false)
    const [ arViewAdded, setArViewAdded ] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined' && window.navigator) {
            const mobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
            setIsMobile(mobile)
        }
        const viewer = document.getElementById('myviewer')
        const onModelLoad = () => {
            if(viewer.activateAR) {
                viewer.activateAR()
            }
        }
        if(openar) {
            if(viewer) {
                viewer.addEventListener('load' , onModelLoad)
            }
        }

        return () => {
            if(viewer) {
                viewer.removeEventListener('load' , onModelLoad)
            }
        }
    }, [openar])

    const onShareClick = async () => {
        if(typeof window !== 'undefined' && window.navigator) {
            const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

            if(mobile) {
                try {
                    await navigator.share({ title: "ARize", url: `https://arizear.app/model-viewer/${id}` });
                    console.log("Data was shared successfully");
                } catch (err) {
                    console.error("Share failed:", err.message);
                }    
            } else {
                setShareModalOpen(true);
            }

            if(id) {
                if(!shareAdded) {
                    setShareAdded(true)
                    try {
                        // @ts-ignore
                        await sharePost( id)
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
        }
    }

    const addARView = async () => {
        if(id) {
            if(!arViewAdded) {
                setArViewAdded(true)
                try {
                    // @ts-ignore
                    await viewARPost(id)
                } catch(error) {
                    console.log(error)
                }
            }
        }
    }

    return (<div style={{width:'100%',height:'100%',position:'relative'}}>
                <model-viewer
                    id="myviewer"
                    src={glbURL} 
                    ar 
                    ar-modes="webxr scene-viewer quick-look" 
                    ar-scale={allowScaling?"auto":'fixed'}
                    loading="eager"
                    reveal={autoPlay?"auto":"interaction"}
                    camera-controls
                    quick-look-browsers="safari chrome"
                    ar-placement={isOnTheWall?'wall':''}
                    background-color={solidBackgroundColor}
                    exposure={exposure}
                    shadow-intensity={hasShadow?shadowIntensity:'0'}
                    shadow-softness={hasShadow?shadowSoftness:'0'}
                    skybox-image={backgroundImage?backgroundImage:null}
                    title={title}
                    alt={title}
                    ios-src={usdzURL}
                    poster={poster?poster:null}
                    style={{width: '100%', height: '100%'}}
                >
                    <button slot="ar-button"  className={styles.myArBtn} style={{backgroundColor:arButtonBackgroundColor,display:hasARButton?'block':'none'}}>
                        <div onClick={() => addARView()} style={{width:'100%',color:arButtonTextColor,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <ARViewIcon fill={arButtonTextColor} />
                            <h3 style={{marginLeft:'10px',color : arButtonTextColor}}>View AR</h3>
                        </div>
                    </button>
                </model-viewer>

                {/* {hasARButton && !isMobile ?<button slot="ar-button"  className={styles.myArBtn} style={{backgroundColor:arButtonBackgroundColor,display:hasARButton?'block':'none'}}>
                        <div onClick={() => addARView()} style={{width:'100%',color:arButtonTextColor,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <ARViewIcon fill={arButtonTextColor} />
                            <h3 style={{marginLeft:'10px'}}>View AR</h3></div>
                    </button>:null} */}

                {!isMobile && id && showQR ? <button onClick={() => setQRModalOpen(true)} className={styles.myArBtn} style={{backgroundColor:arButtonBackgroundColor,display:hasARButton?'block':'none'}}>
                    <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <ARViewIcon fill={arButtonTextColor}/>
                        <h3 style={{marginLeft:'10px',color : arButtonTextColor}}>View AR</h3>
                    </div>
                </button> : null}
                
                {hasWaterMark ? 
                    <div className={styles.waterMark} style={{backgroundImage:waterMarkBase64}}>
                        <RoundImage unchangeable imageSrc={waterMarkBase64} />        
                    </div>
                :null}

                {showShare && hasShareButton ?
                    <button onClick={onShareClick} className={styles.shareBtn} style={{backgroundColor:shareButtonBackgroundColor, color : shareButtonTextColor}}>
                        <div style={{width:'16px',height:'16px'}}>
                            <ShareIcon fill={shareButtonTextColor} />    
                        </div>
                    </button>:null
                }

                {onFullScreen ?
                    <div onClick={onFullScreen} style={{cursor:'pointer',position:'absolute',right:'25px',bottom:'25px',width:'20px',height:'20px'}}>
                        {isFullScreen?
                            <CompressIcon />
                            :
                            <FocusIcon />
                        }
                    </div>
                :null}

                <QRModal 
                    isOpen={qrModalOpen}
                    onRequestClose={() => setQRModalOpen(false)}
                    text='Scan to see AR'
                    url={`https://arizear.app/model-viewer/${id}`}
                />

                <SharePostModal 
                    modalOpen={shareModalOpen}
                    onCloseRequest={() => setShareModalOpen(false)}
                    postID={id}
                />
            </div>)
}

export default ModelViewer