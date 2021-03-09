import React , {useState} from 'react'
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
    hasBackground : boolean ,
    setHasBackground : (value : boolean) => void,
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

    exposure : string,
    setExposure : (value : string) => void,
    shadowIntensity : string,
    setShadowIntensity : (value : string) => void
    shadowSoftness : string,
    setShadowSoftness : (value : string) => void,

    skyBox: boolean,
    setSkyBox: (value : boolean) => void,
    solidBackgroundColor : string,
    solidBackground : boolean,
    setSolidBackgroundColor : (value : string) => void,
    setSolidBackground : (value : boolean) => void,
}




const ARStudioPostDetail = (props : IProps) => {
    const { error,solidBackgroundColor,setSolidBackgroundColor
        ,arButtonTextColor, shareButtonTextColor, shareButtonBackgroundColor,
        allowScaling, setAllowScaling, arButtonBackgroundColor,
        hasARButton, hasShareButton, setARButtonBackgroundColor, setARButtonTextColor,
        setHasARButton, setHasShareButton, setShareButtonBackgroundColor, setShareButtonTextColor,
        solidBackground, setSolidBackground,
        hasShadow, setHasShadow, hasBackground, setHasBackground,
        buttonText, onFinish , postBackgroundImageBase64, setPostBackgroundImageBase64, 
        } = props
    const [intensity, setIntensity] = React.useState<number>(30);
    const [softness, setSoftness] = React.useState<number>(30);
    const [Exposure, setExposure] = React.useState<number>(30);
    const [ waterMark, setWaterMark ] = useState(false) 

    // const handleChange = (event: any, newValue: number | number[]) => {
    //   setIntensity(newValue as number);
    //   setExposure(newValue as number);
    //   setSoftness(newValue as number);
    // }

    return (
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
                    <Collapsible  triggerStyle={{cursor:'pointer', fontWeight:800,alignItems:'center',display:'flex',fontSize:16}} open={true} transitionTime={250} trigger={<div style={{width:'100%',paddingBottom:'10px', display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p style={{display:'flex',flexDirection:'row',alignItems:'center'}}>3D View Setting</p><AngleDown></AngleDown></div>}>
                        <Toggle active={solidBackground} setActive={setSolidBackground} text='Solid Background' />
                        {solidBackground && 
                        <div style={{width:'95%',marginBottom:20}}>
                                <ColorPicker text=''  color={solidBackgroundColor} setColor={setSolidBackgroundColor} />
                        </div>}
                        
                        <div className={styles.contentImageContainer}>
                            <div className={styles.imageInputContainer}>
                                <ImageInput error={error.postBackgroundImageBase64} toggle={hasBackground} setToggle={setHasBackground} setImageSrc={setPostBackgroundImageBase64}  imageSrc={postBackgroundImageBase64} text='Skybox*' extensions={['hdr','jpeg','jpg','png']}/>
                            </div>
                        </div>
                        
                        <Toggle  active={hasShadow} setActive={setHasShadow} text="Shadow" />
                        {hasShadow && <div>
                            
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <Slider 
                                    min={1}
                                    max={100}
                                    value={intensity}
                                    onChange={setIntensity}
                                    text='Intensity'
                                />
                                <Slider 
                                    min={1}
                                    max={100}
                                    value={softness}
                                    onChange={setSoftness}
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
                                value={Exposure}
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
                        </Collapsible>
                           
                <>
                <Collapsible  triggerStyle={{cursor:'pointer',paddingTop:20,borderTop:' 1px solid #EBEBEB ', fontWeight:800,alignItems:'center',display:'flex',fontSize:16}} open={true} transitionTime={250} trigger={<div style={{width:'100%',paddingBottom:'10px', display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p style={{display:'flex',flexDirection:'row',alignItems:'center'}}>Custom Branding</p><AngleDown></AngleDown></div>}>
                    <div className={styles.contentImageContainer}>
                        <div className={styles.imageInputContainer}>
                            <ImageInput error={error.imageSrc} toggle={waterMark} setToggle={setWaterMark} setImageSrc={setPostBackgroundImageBase64}  imageSrc={postBackgroundImageBase64} text='Watermark*' extensions={['hdr','jpeg','jpg','png']}/>
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
            <div style={{display:'flex' ,marginTop:10, alignItems:'center' , width:'100%', flexDirection : 'column' , justifyContent : 'center'}}>
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