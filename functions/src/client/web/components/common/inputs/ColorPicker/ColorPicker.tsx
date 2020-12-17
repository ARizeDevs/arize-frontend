import React , { useEffect, useState } from 'react'
import { ChromePicker } from 'react-color';
import SolidButton from '../../buttons/SolidButton';
import Message from '../../Message';
import { IMessageTypes } from '../../Message/Message';

import styles from './ColorPicker.module.css'

interface IProps {
    color : string ,
    setColor : ( hexColor : string ) => void ,
    text : string,
    error? : string
}

const ColorPicker = (props : IProps) => {
    const { color, setColor, text, error } = props
    const [ tempColor, setTempColor ] = useState('')
    const [ isOpen, setIsOpen ] = useState(false)

    useEffect(() => {
        setTempColor(color)
    } , [color])

    const onCancel = () => {setIsOpen(false);}
    const onDone = () => {setColor(tempColor);setIsOpen(false)}

    return (
        <div className={styles.root}>
            <div className={styles.textAndResultContainer}>
                <p className={`${error?styles.error:''}`}>{text}</p>
                <div onClick={() => {setIsOpen(true);setTempColor(color);}} className={`${styles.colorItemWrapper} ${error?styles.colorItemWrapperError:''}`} style={{backgroundColor:color}}>
                </div>
                {error?<Message type={IMessageTypes.ERROR} text={error} />:null}
            </div>
            {isOpen?<div style={{left:0,right:0,top:0,bottom:0,position:'fixed',zIndex: 100,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div className={styles.modal} >
                <ChromePicker
                    className={styles.SketchPicker}
                    color={tempColor}
                    onChange={(color : any) => {setTempColor(color.hex);}}
                    onChangeComplete={(color : any) => {setTempColor(color.hex);}}
                />
                <br></br>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div style={{width:'70px'}}>
                        <SolidButton colorTheme='black' onClick={onCancel} ><h4>Cancel</h4></SolidButton>
                    </div>
                    <div style={{width:'70px'}}>
                        <SolidButton onClick={onDone} ><h4>Done</h4></SolidButton>
                    </div>
                </div>
            </div></div>:null}
        </div>
    )
}

export default ColorPicker