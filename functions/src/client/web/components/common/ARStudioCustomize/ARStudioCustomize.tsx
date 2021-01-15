import React from 'react'

import SolidButton from '../buttons/SolidButton'
import Input from '../inputs/Input'
import ImageInput from '../inputs/ImageInput'

import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg'

import styles from './ARStudioCustomize.module.css'
import ColorPicker from '../inputs/ColorPicker'
import Toggle from '../inputs/Toggle'

interface IProps {
    actionBUttonTextColor : string,
    setActionBUttonTextColor : (actionBUttonTextColor : string) => void,
    actionButtonColor : string,
    setActionButtonColor : (actionButtonColor :string) => void,
    actionButtonLink : string ,
    setActionButtonLink : (actionButtonLink : string) => void,
    actionInfoBackgroundColor : string ,
    setActionInfoBackgroundColor : (value : string) => void ,
    actionButtonText : string,
    setActionButtonText : (actionButtonText  : string) => void,
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
    hasCallToAction : boolean,
    setHasCallToAction : (value : boolean) => void,
    actionButtonInfoText : string,
    setActionButtonInfoText : (value : string) => void,
    actionButtonInfoTextColor : string,
    setActionButtonInfoTextColor : (value : string) => void
}

const ARStudioPostDetail = (props : IProps) => {
    const { error, actionButtonInfoTextColor, setActionButtonInfoTextColor, actionButtonInfoText, setActionButtonInfoText, hasCallToAction, setHasCallToAction, autoPlay, hasShadow, setAutoPlay, setHasShadow, hasBackground, setHasBackground, buttonText, actionInfoBackgroundColor, setActionInfoBackgroundColor, onFinish , postBackgroundImageBase64, setPostBackgroundImageBase64, actionBUttonTextColor ,actionButtonColor, actionButtonLink, actionButtonText, onBack, setActionBUttonTextColor, setActionButtonColor, setActionButtonLink, setActionButtonText  } = props

    return (
        <div className={styles.root}>
            <div style={{width:'100%',display:'flex'}}>
                <div onClick={onBack} style={{cursor:'pointer',display:'flex' , flexDirection : 'row', alignItems:'center' , justifyContent : 'flex-start'}}>
                    <div style={{width:'16px',marginRight:'8px'}}>
                        {/* @ts-ignore */}
                        <ArrowLeftIcon fill='black'/>
                    </div>
                    <h4>back</h4>
                </div>
            </div>
            <div className={styles.inputWrapper}>
                <Toggle active={hasCallToAction} setActive={setHasCallToAction} text='Set Call To Action' />
                {hasCallToAction?
                <>
                    <Input placeholder='https://example.com/...' error={error.actionButtonLink} maxInputLength={500} required text="Action button link"  type="text" value={actionButtonLink} onChange={setActionButtonLink} />
                    
                    <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <div style={{width:'49%'}}>
                            <Input placeholder='some info...' error={error.actionButtonInfoText} maxInputLength={100} required text="Action button info text"  type="text" value={actionButtonInfoText} onChange={setActionButtonInfoText} />
                        </div>
                        <div style={{width:'49%'}}>
                            <ColorPicker color={actionButtonInfoTextColor} setColor={setActionButtonInfoTextColor} text='Info Text Color' />
                        </div>
                    </div>
                    <br></br>
                    <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space'}}>
                        <div style={{width:'49%'}}>
                            <Input placeholder='some text...' error={error.actionButtonText} maxInputLength={13} required text="Action button Text"  type="text" value={actionButtonText} onChange={setActionButtonText} />
                        </div>
                        <div style={{width:'49%'}}>
                            <ColorPicker color={actionBUttonTextColor} setColor={setActionBUttonTextColor} text='Text Color' />
                        </div>
                    </div>
                    <br></br>

                    <ColorPicker color={actionButtonColor} setColor={setActionButtonColor} text='Action Button Color' />
                    <br></br>
                    <ColorPicker color={actionInfoBackgroundColor} setColor={setActionInfoBackgroundColor} text='Info Area Backgroun Color' />
                    <br></br>

                    <br></br>
                </>:null}                
                <Toggle  active={hasShadow} setActive={setHasShadow} text="Shadow" />
                <Toggle  active={autoPlay} setActive={setAutoPlay} text="Autoplay" />
                <div className={styles.contentImageContainer}>
                    <div className={styles.imageInputContainer}>
                        <ImageInput error={error.postBackgroundImageBase64} toggle={hasBackground} setToggle={setHasBackground} setImageSrc={setPostBackgroundImageBase64}  imageSrc={postBackgroundImageBase64} text='Skybox*' extensions={['hdr','jpeg','jpg','png']}/>
                    </div>
                </div>
            </div>
            <div style={{display:'flex' , width:'100%', flexDirection : 'row' , justifyContent : 'space-between'}}>
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