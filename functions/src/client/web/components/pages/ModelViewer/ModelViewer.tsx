// @ts-nocheck
import React , { useState, useEffect } from 'react'

import QRModal from '../../common/QRModal'

import ARViewIcon from '../../../../assets/icons/arViewIcon.svg'
import ShareIcon from '../../../../assets/icons/share.svg'
import FocusIcon from '../../../../assets/icons/focus.svg'
import CompressIcon from '../../../../assets/icons/compress.svg'

import styles from './ModelViewer.module.css'
import SharePostModal from '../../common/SharePostModal'
import { UDIDContext } from '../../common/UniqueDeviceIdDetector'
import { sharePost, viewARPost } from '../../../API'

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

    backgroundImage : string,
    poster : string,
    autoPlay : boolean,
    showQR : boolean,

    showShare? : boolean,
    onFullScreen? : () => void,
    isFullScreen? : boolean,
    showBanner? : boolean
}

const ModelViewer = (props : IProps) => {
    const { title, glbURL, backgroundImage, usdzURL, solidBackgroundColor,
            poster, allowScaling, exposure, autoPlay, id,  showQR, showShare, onFullScreen, 
            isFullScreen, hasARButton, hasShareButton, shareButtonBackgroundColor, shareButtonTextColor, 
            arButtonBackgroundColor, arButtonTextColor, hasShadow, shadowIntensity, shadowSoftness } = props

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
    }, [])

    return (
        <UDIDContext.Consumer >
            {value => {
                
                const onShareClick = async () => {
                    if(typeof window !== 'undefined' && window.navigator) {
                        const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

                        if(mobile) {
                            try {
                                await navigator.share({ title: "ARize", url: `https://arizear.app/post/${id}` });
                                console.log("Data was shared successfully");
                            } catch (err) {
                                console.error("Share failed:", err.message);
                            }    
                        } else {
                            setShareModalOpen(true);
                        }

                        if(value.UDIDCTX && id) {
                            if(!shareAdded) {
                                try {
                                    // @ts-ignore
                                    await sharePost(value.UDIDCTX,value.location, id)
                                    setShareAdded(true)
                                } catch(error) {
                                    console.log(error)
                                }
                            }
                        }
                    }
                }

                const addARView = async () => {
                    if(value.UDIDCTX && id) {
                        if(!arViewAdded) {
                            try {
                                // @ts-ignore
                                await viewARPost(value.UDIDCTX,value.location, id)
                                setArViewAdded(true)
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
                        <div onClick={() => addARView()} style={{width:'100%',color:arButtonTextColor,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}><ARViewIcon fill={arButtonTextColor} /><h3 style={{marginLeft:'10px'}}>View AR</h3></div>
                    </button>
                </model-viewer>

                {!isMobile && id && showQR ? <button onClick={() => setQRModalOpen(true)} className={styles.myArBtn} >
                    <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}><ARViewIcon /><h3 style={{marginLeft:'10px'}}>View AR</h3></div>
                </button> : null}
                
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
        }}
    </UDIDContext.Consumer>
    )
}

export default ModelViewer