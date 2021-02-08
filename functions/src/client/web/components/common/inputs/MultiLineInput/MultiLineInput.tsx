import React, { useState } from 'react'
import Message from '../../Message'
import { IMessageTypes } from '../../Message/Message'

import styles from './MultiLineInput.module.css'

interface IProps {
    text : string,
    required : boolean,
    LeftIcon? : any,
    RightIcon? : any,
    onLeftIconClick?: Function,
    onRightIconClick?: Function,
    value?:string,
    onChange?:Function,
    placeholder? : string,
    removeBorder? : boolean,
    onKeyDown? : (e : any) => void,
    error? : string,
    maxInputLength? : number,
    rows? : number,
    style?: React.CSSProperties
}

const MultiLineInput = (props : IProps) => {
    const { error, rows, maxInputLength, text, required, LeftIcon, RightIcon, onLeftIconClick, onRightIconClick, onChange, value, placeholder, removeBorder, onKeyDown } = props
    const [ active, setActive ] = useState(false)

    const onFocus = () => setActive(true)
    const onBlur = () => setActive(false)

    const onInputChanged = (e : any) => {
        if(onChange) {
            if(maxInputLength) {
                if(maxInputLength > e.target.value.length) onChange(e.target.value)
            } else {
                onChange(e.target.value)
            }
        }
    }

    const labelText = `${text}${required?'*':''}`

    return (
        <div className={styles.container + ' flex-column'}>
            <p className={`${styles.label} ${error?styles.error:''}`}>{labelText}</p>
            <div className={`${styles.secondContainer} flex-row ${error?styles.secondContainerError:(active?styles.secondContainerActive:'')} ${removeBorder?styles.removeBorder:''}`} style={props.style} >
                {LeftIcon?<LeftIcon onClick={onLeftIconClick?onLeftIconClick:null} className={styles.iconLeft} fill={active?'var(--main-blue-color)':'var(--main-lightgray2-color)'} />:null}
                <textarea rows={rows?rows:5} onKeyDown={onKeyDown} placeholder={placeholder?placeholder:''} onChange={onInputChanged} value={value} onFocus={onFocus} onBlur={onBlur} className={styles.input}/>
                {RightIcon?<RightIcon onClick={onRightIconClick?onRightIconClick:null} className={styles.iconRight} fill={active?'var(--main-blue-color)':'var(--main-black-color)'} />:null}
            </div>
            {error?<Message text={error} type={IMessageTypes.ERROR} />:null}
        </div>
    )
}

export default MultiLineInput