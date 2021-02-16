import React from 'react'

import ModelViewer from '../../pages/ModelViewer'

import styles from './Preview.module.css'

interface IProps {
    id : string,
    hasShadow : boolean,
    shadowIntensity : string,
    shadowSoftness : string,
    autoPlay : boolean,
    poster : string,
    postTitle : string,
    exposure : string,
    contentFile : any,
    allowScaling : boolean,
    backgrounImage : string,
    solidBackgroundColor : string,
    hasShareButton : boolean,
    shareButtonBackgroundColor : string,
    shareButtonTextColor : string,

    hasARButton : boolean,
    arButtonBackgroundColor : string,
    arButtonTextColor : string,

    buttnPreview : boolean,
}

const Preview = (props : IProps) => {
    const {
        autoPlay,
        backgrounImage,
        contentFile,
        exposure,
        id,
        postTitle,
        poster,
        allowScaling,
        arButtonBackgroundColor,
        arButtonTextColor,
        buttnPreview,
        hasARButton,
        hasShadow,
        hasShareButton,
        shareButtonBackgroundColor,
        shareButtonTextColor,
        shadowIntensity,
        shadowSoftness,
        solidBackgroundColor
    } = props

    const renderInnerPreview = () => {
        return (
        <>
            <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:'90%',height:'95%'}}>
                    <ModelViewer
                        arButtonTextColor={arButtonTextColor}
                        arButtonBackgroundColor={arButtonBackgroundColor}
                        hasARButton={hasARButton}
                        hasShadow={hasShadow}
                        hasShareButton={hasShareButton}
                        shareButtonBackgroundColor={shareButtonBackgroundColor}
                        shareButtonTextColor={shareButtonTextColor}
                        solidBackgroundColor={solidBackgroundColor}
                        shadowIntensity={shadowIntensity}
                        shadowSoftness={shadowSoftness}
                        exposure={exposure}
                        allowScaling={allowScaling}
                        showQR={false}
                        id={id}
                        title={postTitle}
                        autoPlay={autoPlay}
                        glbURL={typeof window !== "undefined" && contentFile ?  (typeof contentFile !== "string"? window.URL.createObjectURL(contentFile) : contentFile ):''}
                        backgroundImage={backgrounImage}
                        poster={poster}
                        usdzURL={''}
                    />
                </div>

                <img className={styles.iosDeviceBackground} src={'/images/iOS phone.png'}></img>
            </div>
        </>
        )
    }

    return (
        <div className={styles.root}>
            <div className={styles.device} >
                {renderInnerPreview()}
            </div>
        </div>)
}

export default Preview