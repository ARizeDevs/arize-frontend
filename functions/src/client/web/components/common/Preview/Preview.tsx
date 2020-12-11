import React , { useState } from 'react'

import Banner from '../../pages/Banner'
import ModelViewer from '../../pages/ModelViewer'

import styles from './Preview.module.css'

interface IProps {
    buttonText : string,
    buttonColor : string,
    buttonTextColor : string,
    link : string,
    infoBackgroundColor : string,
    hasShadow : boolean,
    autoPlay : boolean,
    poster : string,
    contentFile : any,
    backgrounImage : string,
}

const Preview = (props : IProps) => {
    const {
        // autoPlay,
        backgrounImage,
        buttonColor,
        buttonText,
        buttonTextColor,
        contentFile,
        // hasShadow,
        poster,
        infoBackgroundColor,
        link,
    } = props

    const [isAndroid , setIsAndroid] = useState(false)

    console.log('---------')
    console.log(contentFile)
    const renderInnerPreview = () => {
        return (
        <>
            <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:'90%',height:'95%'}}>
                    <ModelViewer 
                        autoPlay={true}
                        glbURL={typeof window !== "undefined" && contentFile ? window.URL.createObjectURL(contentFile):''}
                        actionButtonColor={buttonColor}
                        actionButtonInfoBackgroundColor={infoBackgroundColor}
                        actionButtonLink={link}
                        actionButtonText={buttonText}
                        actionButtonTextColor={buttonTextColor}
                        background={backgrounImage}
                        poster={poster}
                        usdzURL={''}
                    />
                </div>
                {!isAndroid?
                    <div style={{position:'absolute',bottom:'7%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <Banner 
                            buttonColor={buttonColor}
                            buttonText={buttonText}
                            buttonTextColor={buttonTextColor}
                            infoBackgrounColor={infoBackgroundColor}
                            link={link}
                        />
                    </div>:null}
                <img style={{position:'absolute',height:'100%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',pointerEvents: 'none'}} src={isAndroid?'/images/Android phone.png':'/images/iOS phone.png'}></img>
            </div>
                {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',flexGrow:1}}>
                    <div style={{width:'50px',height:'50px',marginRight:'5px'}}>
                        <RoundImage unchangeable imageSrc={userProfilePictureURL}/>
                    </div>
                    <p style={{width:'65%',wordWrap:"break-word",display:'block'}}><h4>{postTitle}</h4> by <small style={{opacity:'.6'}}>{userFullname}</small></p>
                </div>
                <ExclamationMarkIcon /> */}
        </>
        )
    }

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <h3>Preview in: </h3>&nbsp;&nbsp;
                <p onClick={() => setIsAndroid(false)} style={{color : !isAndroid ? 'var(--main-blue-color)' : 'var(--main-lightgray2-color)' }}>IOS</p>&nbsp;&nbsp;
                <p onClick={() => setIsAndroid(true)} style={{color : isAndroid ? 'var(--main-blue-color)' : 'var(--main-lightgray2-color)' }}>Android</p>
            </div>
            {isAndroid ? 
                <div className={styles.device} style={{background : 'url(/images/android-phone.png)'}}>
                    {renderInnerPreview()}
                </div> : 
                <div className={styles.device} >
                    {renderInnerPreview()}
                </div>
            }
        </div>)
}

export default Preview