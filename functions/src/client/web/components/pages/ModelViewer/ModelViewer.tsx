// @ts-nocheck
import React , { useState, useEffect } from 'react'

import QRModal from '../../common/QRModal'

import ARViewIcon from '../../../../assets/icons/arViewIcon2.svg'
import ShareIcon from '../../../../assets/icons/share.svg'
import FocusIcon from '../../../../assets/icons/focus.svg'
import CompressIcon from '../../../../assets/icons/compress.svg'

import styles from './ModelViewer.module.css'
import SharePostModal from '../../common/SharePostModal'
import { sharePost, viewARPost } from '../../../API/posts'
// import RoundImage from '../../common/RoundImage'

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
    const [ tapDistance, setTapDistance] = useState(2);
    let panning = false;
    let metersPerPixel;
    let panX, panY;
    let startX, startY;
    let lastX, lastY;

    useEffect(() => {
        if(typeof window !== 'undefined' && window.navigator) {
            const mobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
            setIsMobile(mobile)
        }

        document.oncontextmenu= () => {
            return false;
        }

        const viewer = document.getElementById('myviewer')
        const onModelLoad = () => {
            if(viewer.activateAR && openar) {
                viewer.activateAR()
            }
            viewer.addEventListener('mousedown', (event) => {
                startX = event.clientX;
                startY = event.clientY;
                panning = event.button === 2 || event.ctrlKey || event.metaKey || event.shiftKey;
                if (!panning)
                  return;
            
                lastX = startX;
                lastY = startY;
                startPan();
                event.stopPropagation();
            }, true)
            
            viewer.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
                panning = event.touches.length === 2;
                if (!panning)
                    return;
        
                const {touches} = event;
                lastX = 0.5 * (touches[0].clientX + touches[1].clientX);
                lastY = 0.5 * (touches[0].clientY + touches[1].clientY);
                startPan();
            }, true)
        
            viewer.addEventListener('mousemove', (event) => {
                if (!panning)
                    return;
        
                movePan(event.clientX, event.clientY);
                event.stopPropagation();
            }, true)
        
            viewer.addEventListener('touchmove',(event) => {
                if (!panning || event.touches.length !== 2)
                    return;
    
                const {touches} = event;
                const thisX = 0.5 * (touches[0].clientX + touches[1].clientX);
                const thisY = 0.5 * (touches[0].clientY + touches[1].clientY);
                movePan(thisX, thisY);
            }, true)

            self.addEventListener('mouseup', (event) => {
                if(event.button === 2){
                    recenter(event);
                }
              }, true);
              
            self.addEventListener('touchend', (event) => {
                if (event.touches.length === 0) {
                    recenter(event.changedTouches[0]);
                }
            }, true);
        }
        if(viewer) {
            viewer.addEventListener('load' , onModelLoad)
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

    const startPan = () => {
        const localViewer = document.getElementById('myviewer')
        const orbit = localViewer.getCameraOrbit();
        const {theta, phi, radius} = orbit;
        const psi = theta - localViewer.turntableRotation;
        metersPerPixel = 0.001 * radius;
        
        localViewer.getBoundingClientRect.height;

        panX = [-Math.cos(psi), 0, Math.sin(psi)];
        panY = [
            -Math.cos(phi) * Math.sin(psi),
            Math.sin(phi),
            -Math.cos(phi) * Math.cos(psi)
        ];
        localViewer.interactionPrompt = 'none';
    }

    const movePan = (thisX, thisY) => {
        const localViewer = document.getElementById('myviewer')
        const dx = (thisX - lastX) * (metersPerPixel);
        const dy = (thisY - lastY) * (metersPerPixel);
        lastX = thisX;
        lastY = thisY;
    
        const target = localViewer.getCameraTarget();
        target.x += dx * panX[0] + dy * panY[0];
        target.y += dx * panX[1] + dy * panY[1];
        target.z += dx * panX[2] + dy * panY[2];
        localViewer.cameraTarget = `${target.x}m ${target.y}m ${target.z}m`;
        localViewer.dispatchEvent(new CustomEvent('camera-change', {detail: {source: 'user-interaction'}}));
    }

    const recenter = (pointer) => {
        const localViewer = document.querySelector("#myviewer");
        panning = false;
        if (Math.abs(pointer.clientX - startX) > tapDistance ||
            Math.abs(pointer.clientY - startY) > tapDistance)
          return;
        const rect = localViewer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const hit = localViewer.positionAndNormalFromPoint(x, y);
        localViewer.cameraTarget = hit == null ? 'auto auto auto' : hit.position.toString();
        
    }

    const onPointerUp = (event) =>{
        const pointer = event.clientX ? event : event.changedTouches[0];
        if (Math.abs(pointer.clientX - startX) < tapDistance &&
            Math.abs(pointer.clientY - startY) < tapDistance) {
            recenter(pointer);
        }
        panning = false;
    }



    //--------------- end Panning ----------//

    return (<div style={{width:'100%',height:'100%',position:'relative',backgroundColor:solidBackgroundColor?solidBackgroundColor:'#FFFFF'}}>
                <model-viewer
                    id="myviewer"
                    src={glbURL} 
                    ar 
                    ar-modes="webxr scene-viewer quick-look" 
                    ar-scale={allowScaling?"auto":'fixed'}
                    loading="lazy"
                    reveal={autoPlay?"auto":"interaction"}
                    camera-controls
                    // style={`background-color: ${solidBackgroundColor};`}
                    quick-look-browsers="safari chrome"
                    ar-placement={isOnTheWall?'wall':''}
                    // background-color={solidBackgroundColor}
                    exposure={exposure}
                    shadow-intensity={hasShadow?shadowIntensity:'0'}
                    shadow-softness={hasShadow?shadowSoftness:'0'}
                    skybox-image={backgroundImage?backgroundImage:null}
                    title={title}
                    alt={title}
                    ios-src={usdzURL}
                    poster={poster?poster:null}
                    style={{width: '100%', height: '100%'}}
                    data-js-focus-visible
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
                        {/* <RoundImage unchangeable imageSrc={waterMarkBase64} />         */}
                        <img className={styles.roundImage} src={waterMarkBase64} />
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