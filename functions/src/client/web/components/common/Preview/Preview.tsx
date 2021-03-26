import React from 'react'

import Ground from '../../../../assets/banners/Ground.svg'
import Wall from '../../../../assets/banners/Wall.svg'


import ModelViewer from '../../pages/ModelViewer'

import styles from './Preview.module.css'

interface IProps {
    id : string,
    hasShadow : boolean,
    shadowIntensity : number,
    shadowSoftness : number,
    autoPlay : boolean,
    poster : string,
    postTitle : string,
    exposure : number,
    contentFile : any,
    allowScaling : boolean,
    backgrounImage : string,
    isOnTheGround : boolean,
    page : number,
    solidBackgroundColor : string,
    hasShareButton : boolean,
    shareButtonBackgroundColor : string,
    shareButtonTextColor : string,

    hasARButton : boolean,
    arButtonBackgroundColor : string,
    arButtonTextColor : string,

    buttnPreview : boolean,

    hasWaterMark : boolean,
    waterMarkBase64 : string
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
        hasARButton,
        hasShadow,
        hasShareButton,
        shareButtonBackgroundColor,
        shareButtonTextColor,
        shadowIntensity,
        shadowSoftness,
        solidBackgroundColor,
        hasWaterMark,
        waterMarkBase64,
        page,
        isOnTheGround
    } = props

    const renderInnerPreview = () => {
        return (
        <>
            <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:'90%',height:'95%',position:'relative'}}>
                    <ModelViewer
                        hasWaterMark={hasWaterMark}
                        waterMarkBase64={page===3?waterMarkBase64:''}
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
                        id={id}
                        title={postTitle}
                        autoPlay={autoPlay}
                        glbURL={typeof window !== "undefined" && contentFile ?  (typeof contentFile !== "string"? window.URL.createObjectURL(contentFile) : contentFile ):''}
                        backgroundImage={backgrounImage}
                        poster={poster}
                        showShare={true}
                        usdzURL={''}
                    />
                </div>

                {page===1?
                <div style={{position:'absolute',width:'90%'}}>
                    {isOnTheGround?
                    <Ground  />:<Wall />}
                </div>
                :null}
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