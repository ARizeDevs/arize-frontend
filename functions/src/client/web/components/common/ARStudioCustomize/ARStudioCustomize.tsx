import React from 'react'
import SolidButton from '../buttons/SolidButton'
// import Input from '../inputs/Input'
import ImageInput from '../inputs/ImageInput'
import Slider from '../inputs/Slider'

import Collapsible from 'react-collapsible';
import AngleDown from '../../../../assets/icons/angle-down 1.svg'
// import AngleUp from '../../../../assets/icons/angle-down 2.svg'
import styles from './ARStudioCustomize.module.css'
import ColorPicker from '../inputs/ColorPicker'
import Toggle from '../inputs/Toggle'


interface IProps {
    postBackgroundImageBase64 : string ,
    setPostBackgroundImageBase64 : (src : string) => void,
    hasShadow : boolean ,
    setHasShadow : (value : boolean) => void,
    autoPlay : boolean,
    setAutoPlay : (value : boolean) => void,
    onFinish : () => void,
    onBack : () => void,
    error : {[key : string] : string},
    buttonText : string ,
    backButtonText : string,
    
    hasShareButton : boolean,
    setHasShareButton : (value : boolean ) => void,
    shareButtonBackgroundColor : string,
    setShareButtonBackgroundColor : (value : string) => void,
    shareButtonTextColor : string,
    setShareButtonTextColor : (value : string ) => void

    hasARButton : boolean,
    setHasARButton : (value : boolean) => void,
    arButtonBackgroundColor : string,
    setARButtonBackgroundColor : (value : string) => void
    arButtonTextColor : string,
    setARButtonTextColor : (value : string) => void

    allowScaling : boolean,
    setAllowScaling : (value : boolean) => void,

    exposure : number,
    setExposure : (value : number) => void,
    shadowIntensity : number,
    setShadowIntensity : (value : number) => void
    shadowSoftness : number,
    setShadowSoftness : (value : number) => void,

    hasSkyBox: boolean,
    setHasSkyBox: (value : boolean) => void,
    solidBackgroundColor : string,
    // solidBackground : boolean,
    setSolidBackgroundColor : (value : string) => void,
    // setSolidBackground : (value : boolean) => void,

    hasWaterMark : boolean,
    setHasWaterMark : ( value : boolean ) => void,

    waterMarkBase64 : string,
    setWaterMarkBase64 : ( value : string ) => void

    // hdrFile? : any,
    // setHDRFile : (file : any) => void
}


const ARStudioPostDetail = (props : IProps) => {
    const { error,solidBackgroundColor,setSolidBackgroundColor
        ,arButtonTextColor, shareButtonTextColor, shareButtonBackgroundColor,
        allowScaling, setAllowScaling, arButtonBackgroundColor, exposure, setExposure,
        hasARButton, hasShareButton, setARButtonBackgroundColor, setARButtonTextColor,
        setHasARButton, setHasShareButton, setShareButtonBackgroundColor, setShareButtonTextColor,
        hasSkyBox, setHasSkyBox,
        // ,hdrFile, setHDRFile,
        hasShadow, setHasShadow, shadowIntensity, setShadowIntensity, shadowSoftness, setShadowSoftness,
        buttonText, onFinish , postBackgroundImageBase64, setPostBackgroundImageBase64, 
        hasWaterMark, setHasWaterMark, waterMarkBase64, setWaterMarkBase64, autoPlay, setAutoPlay
        } = props
    // const [intensity, setIntensity] = React.useState<number>(30);
    // const [softness, setSoftness] = React.useState<number>(30);
    // const [ waterMark, setWaterMark ] = useState(false) 

    // const handleChange = (event: any, newValue: number | number[]) => {
    //   setIntensity(newValue as number);
    //   setExposure(newValue as number);
    //   setSoftness(newValue as number);
    // }

    return (
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
            <Collapsible  triggerStyle={{cursor:'pointer', fontWeight:800,alignItems:'center',display:'flex',fontSize:16}} open={true} transitionTime={250} trigger={<div style={{width:'100%',paddingBottom:'10px', display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p style={{display:'flex',flexDirection:'row',alignItems:'center'}}>3D View Setting</p><AngleDown></AngleDown></div>}>
                        <Toggle active={!hasSkyBox} setActive={(value : boolean) => setHasSkyBox(!value)} text='Solid Background' />
                        {!hasSkyBox && 
                        <div style={{width:'95%',marginBottom:20}}>
                                <ColorPicker text=''  color={solidBackgroundColor} setColor={setSolidBackgroundColor} />
                        </div>}
                        
                        <div className={styles.contentImageContainer}>
                            <div className={styles.imageInputContainer}>
                                <ImageInput 
                                    // hdrFile={hdrFile} 
                                    // setHDRFile={setHDRFile} 
                                    error={error.postBackgroundImageBase64} toggle={hasSkyBox} setToggle={setHasSkyBox} setImageSrc={setPostBackgroundImageBase64}  imageSrc={postBackgroundImageBase64} text='Skybox*' extensions={['hdr','jpeg','jpg','png']}/>
                            </div>
                        </div>
                        
                        <Toggle  active={hasShadow} setActive={setHasShadow} text="Shadow" />
                        {hasShadow && <div>
                            
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <Slider 
                                    min={1}
                                    max={100}
                                    value={shadowIntensity}
                                    onChange={setShadowIntensity}
                                    text='Intensity'
                                />
                                <Slider 
                                    min={1}
                                    max={100}
                                    value={shadowSoftness}
                                    onChange={setShadowSoftness}
                                    text='Softness'
                                />
                                {/* <p style={{marginBottom:10,fontWeight:400}}>Softness</p>
                                <div className={styles.sliderContainer}>
                                    <input type="range" min="1" max="100" value={intensity} onChange={handleChange} className={styles.slider} id="myRange"/>
                                    <p><span id="demo"></span></p>
                                </div> */}
                        
                                {/* <p style={{marginBottom:10,fontWeight:400}}>Intensity</p>
                                <div className={styles.sliderContainer}>
                                    <input type="range" min="1" max="100" value={softness} onChange={handleChange} className={styles.slider} id="myRange"/>
                                    <p><span id="demo"></span></p>
                                </div> */}
                            </div>
                            <br></br>
                        </div>}
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Slider 
                                min={1}
                                max={100}
                                value={exposure}
                                onChange={setExposure}
                                text='Exposure'
                            />
                            {/* <p style={{marginBottom:10,fontWeight:900}}>Exposure</p>
                            <div className={styles.sliderContainer}>
                                <input type="range" min="1" max="100" value={Exposure} onChange={handleChange} className={styles.slider} id="myRange"/>
                                <p><span id="demo"></span></p>
                            </div> */}
                        </div>
                        
                        <Toggle  active={allowScaling} setActive={setAllowScaling} text="Allow Scaling" />  
                        <p style={{fontSize:12}}>This allows user to scale up or down the model. When off, the model will be locked on its actual size.</p>       
                        <br></br>
                        <Toggle  active={autoPlay} setActive={setAutoPlay} text="Auto Play" />
                        <p style={{fontSize:12}}> If "On" the 3D model will show right after the page loaded. If "Off" requires a click on the thumbnail to show the 3D model </p> 
                        <br></br>
                        </Collapsible>
                           
                <>
                <Collapsible  triggerStyle={{cursor:'pointer',paddingTop:20,borderTop:' 1px solid #EBEBEB ', fontWeight:800,alignItems:'center',display:'flex',fontSize:16}} open={true} transitionTime={250} trigger={<div style={{width:'100%',paddingBottom:'10px', display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p style={{display:'flex',flexDirection:'row',alignItems:'center'}}>Custom Branding</p><AngleDown></AngleDown></div>}>
                    <div className={styles.contentImageContainer}>
                        <div className={styles.imageInputContainer}>
                            <ImageInput error={error.imageSrc} toggle={hasWaterMark} setToggle={setHasWaterMark} setImageSrc={setWaterMarkBase64}  imageSrc={waterMarkBase64} text='Watermark*' extensions={['jpeg','jpg','png']}/>
                        </div>
                        </div>
                        <Toggle  active={hasShareButton} setActive={setHasShareButton} text="Share Button" />
                    {hasShareButton && <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                        <div style={{width:'95%'}}>
                            <ColorPicker color={shareButtonBackgroundColor} setColor={setShareButtonBackgroundColor} text='Button Color' />
                        </div>
                    
                    <br></br>
                    
                        <div style={{width:'95%'}}>
                            <ColorPicker color={shareButtonTextColor} setColor={setShareButtonTextColor} text='Icon Color' />
                        </div>
                    </div>}
                    <br></br>
                    <Toggle  active={hasARButton} setActive={setHasARButton} text="AR Button" />
                    {hasARButton && <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                        <div style={{width:'95%'}}>
                    <ColorPicker color={arButtonBackgroundColor} setColor={setARButtonBackgroundColor} text='Button Color' />
                    <br></br>
                    <ColorPicker color={arButtonTextColor} setColor={setARButtonTextColor} text='Text and Icon Color' />
                    </div>
                    </div>}
                    <br></br>
                    </Collapsible>
                </>               

            </div>
            <div style={{marginTop:'20px',display:'flex' , alignItems:'center' , width:'100%', flexDirection : 'column' , justifyContent : 'center'}}>
                {/* <div className={styles.buttonWrapper}>
                    <SolidButton onClick={onBack} ><h3>{backButtonText}</h3></SolidButton>
                </div> */}
                {/* <div className={styles.buttonWrapper}> */}
                <SolidButton onClick={onFinish} ><h3>{buttonText}</h3></SolidButton>
                {/* </div> */}
            </div>
        </div>)
}

export default ARStudioPostDetail