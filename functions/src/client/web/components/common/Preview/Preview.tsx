import React , { useState } from 'react'

// import Banner from '../../pages/Banner'
import ModelViewer from '../../pages/ModelViewer'

import styles from './Preview.module.css'

interface IProps {
    id : string,
    hasShadow : boolean,
    autoPlay : boolean,
    poster : string,
    postTitle : string,
    contentFile : any,
    allowScaling : boolean,
    backgrounImage : string,
    
    // hasCallToAction : boolean,
    // buttonText : string,
    // buttonColor : string,
    // buttonTextColor : string,
    // infoText : string,
    // infoBackgroundColor : string,
    // infoTextColor : string
    // link : string,
}

const Preview = (props : IProps) => {
    const {
        autoPlay,
        backgrounImage,
        id,
        postTitle,
        contentFile,
        poster,
        allowScaling,
        // buttonColor,
        // buttonText,
        // buttonTextColor,
        // infoTextColor,
        // infoText,
        // hasShadow,
        // infoBackgroundColor,
        // link,
        // hasCallToAction
    } = props

    // const [isAndroid , setIsAndroid] = useState(false)

    const renderInnerPreview = () => {
        return (
        <>
            <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:'90%',height:'95%'}}>
                    <ModelViewer
                        allowScaling={allowScaling}
                        showQR={false}
                        id={id}
                        title={postTitle}
                        autoPlay={autoPlay}
                        glbURL={typeof window !== "undefined" && contentFile ?  (typeof contentFile !== "string"? window.URL.createObjectURL(contentFile) : contentFile ):''}
                        // actionButtonColor={buttonColor}
                        // actionButtonInfoBackgroundColor={infoBackgroundColor}
                        // hasCallToAction={hasCallToAction}
                        // actionButtonLink={link}
                        // actionButtonText={buttonText}
                        // actionButtonTextColor={buttonTextColor}
                        // actionButtonInfoText={infoText}
                        // actionButtonInfoTextColor={infoTextColor}
                        backgroundImage={backgrounImage}
                        poster={poster}
                        usdzURL={''}
                    />
                </div>

                {/* { hasCallToAction?
                    <div style={{position:'absolute',bottom:'2%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <Banner
                            postTitle={postTitle}
                            isAndroid={isAndroid}
                            infoText={infoText}
                            infoTextColor={infoTextColor}                       
                            buttonColor={buttonColor}
                            buttonText={buttonText}
                            buttonTextColor={buttonTextColor}
                            infoBackgrounColor={infoBackgroundColor}
                            link={link}
                        />
                    </div>:null}
                <img style={{position:'absolute',height:'100%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',pointerEvents: 'none'}} src={isAndroid?'/images/Android phone.png':'/images/iOS phone.png'}></img> */}
                <img className={styles.iosDeviceBackground} src={'/images/iOS phone.png'}></img>
            </div>
        </>
        )
    }

    return (
        <div className={styles.root}>
            {/* <div className={styles.title}>
                <h4>Preview in: </h4>&nbsp;&nbsp;
                <p onClick={() => setIsAndroid(false)} style={{color : !isAndroid ? 'var(--main-blue-color)' : 'var(--main-lightgray2-color)',fontSize:'13px'}}>IOS</p>&nbsp;&nbsp;
                <p onClick={() => setIsAndroid(true)} style={{color : isAndroid ? 'var(--main-blue-color)' : 'var(--main-lightgray2-color)',fontSize:'13px'}}>Android</p>
            </div>
            {isAndroid ? 
                <div className={styles.device} style={{background : 'url(/images/android-phone.png)'}}>
                    {renderInnerPreview()}
                </div> :  */}
                <div className={styles.device} >
                    {renderInnerPreview()}
                </div>
            {/* } */}
        </div>)
}

export default Preview