// @ts-nocheck
import React , { useState, useEffect } from 'react'

import QRModal from '../../common/QRModal'

import ARViewIcon from '../../../../assets/icons/arViewIcon.svg'
import ShareIcon from '../../../../assets/icons/share16.svg'

import styles from './ModelViewer.module.css'
import SharePostModal from '../../common/SharePostModal'
import { UDIDContext } from '../../common/UniqueDeviceIdDetector'
import { sharePost, viewARPost } from '../../../API'

interface IProps {
    glbURL : string,
    usdzURL : string,
    id : string,
    actionButtonText : string,
    actionButtonTextColor : string,
    actionButtonInfoBackgroundColor : string,
    actionButtonColor : string,
    actionButtonLink : string,
    background : string,
    poster : string,
    autoPlay : boolean,
    actionButtonInfoText : string,
    actionButtonInfoTextColor : string,
    showQR : boolean,
    showShare? : boolean
}

const getUSZFileFullURL = (actionButtonBackgroundColor : string, actionButtonColor : string,
    actionButtonInfoColor : string, actionButtonLink : string, actionButtonText : string, actionButtonInfoText : string, actionButtonInfoTextColor : string) => {

    return `https://arizear.app/banner?link=${actionButtonLink}&buttonText=${actionButtonText}&buttonColor=${actionButtonBackgroundColor}&buttonTextColor=${actionButtonColor}&infoBackgrounColor=${actionButtonInfoColor}&infoText=${actionButtonInfoText}&infoTextColor=${actionButtonInfoTextColor}`
}

const ModelViewer = (props : IProps) => {
    const { glbURL, background, usdzURL,
            actionButtonInfoBackgroundColor, actionButtonColor,
            actionButtonLink, actionButtonText, actionButtonTextColor, actionButtonInfoTextColor,
            poster, autoPlay, id, actionButtonInfoText, showQR, showShare } = props

    const [ qrModalOpen, setQRModalOpen ] = useState(false)
    const [ shareModalOpen, setShareModalOpen ] = useState(false)
    const [ isMobile, setIsMobile ] = useState(false)
    const [ shareAdded, setShareAdded ] = useState(false)
    const [ arViewAdded, setArViewAdded ] = useState(false)


    useEffect(() => {
        const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        setIsMobile(mobile)
    }, [])

    const compoundUSDZUrl = getUSZFileFullURL(actionButtonColor , actionButtonTextColor, actionButtonInfoBackgroundColor, actionButtonLink, actionButtonText, actionButtonInfoText, actionButtonInfoTextColor)

    const fullUSDZUrl = `${usdzURL}#custom=${compoundUSDZUrl}`

    return (
        <UDIDContext.Consumer >
            {value => {
                const addShare = async () => {
                    if(value.UDIDCTX && id) {
                        if(!shareAdded) {
                            await sharePost(value.UDIDCTX,value.location, id)
                            setShareAdded(true)
                        }
                    }
                }

                const addARView = async () => {
                    if(value.UDIDCTX && id) {
                        if(!arViewAdded) {
                            await viewARPost(value.UDIDCTX,value.location, id)
                            setArViewAdded(true)
                        }
                    }
                }

            return (<>
                <model-viewer 
                    id="myviewer"
                    src={glbURL} 
                    ar 
                    ar-modes="scene-viewer quick-look" 
                    ar-scale="auto"
                    loading="eager"
                    reveal={autoPlay?"auto":"interaction"}
                    camera-controls
                    shadow-intensity="0"
                    shadow-softness="0"
                    skybox-image={background?background:null}
                    alt="Couldn't load the model" 
                    ios-src={fullUSDZUrl}
                    poster={poster?poster:null}
                    style={{width: '100%', height: '100%'}}
                >
                    <button slot="ar-button"  className={styles.myArBtn} >
                        <div onClick={() => addARView()} style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}><ARViewIcon /><h3>View AR</h3></div>
                    </button>
                </model-viewer>
                {!isMobile && id && showQR ? <button onClick={() => setQRModalOpen(true)} className={styles.myArBtn} >
                    <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}><ARViewIcon /><h3>View AR</h3></div>
                </button> : null}
                {showShare ?
                    <button onClick={() => {setShareModalOpen(true);addShare()}} className={styles.shareBtn} >
                        <ShareIcon />    
                    </button>:null
                }
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
            </>)
        }}
    </UDIDContext.Consumer>
    )
}

export default ModelViewer