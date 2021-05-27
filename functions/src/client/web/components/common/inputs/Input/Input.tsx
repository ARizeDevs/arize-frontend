import React, { useState } from 'react'
import Message from '../../Message'
import { IMessageTypes } from '../../Message/Message'

import styles from './Input.module.css'

interface IProps {
    text? : string,
    required : boolean,
    LeftIcon? : any,
    RightIcon? : any,
    type : string,
    onLeftIconClick?: Function,
    onRightIconClick?: Function,
    value?:string,
    onChange?:Function,
    placeholder? : string,
    removeBorder? : boolean,
    onKeyDown? : (e : any) => void,
    disabled? : boolean,
    error? : string,
    maxInputLength? : number,
    shouldFocus? : boolean,
    onEditEnd?: ()=> void
}

const Input = (props : IProps) => {
    const { error, maxInputLength, disabled, text, required, LeftIcon, RightIcon, type, onLeftIconClick, onRightIconClick, onChange, value, placeholder, removeBorder, shouldFocus, onKeyDown, onEditEnd } = props
    const [ active, setActive ] = useState(false)

    const onFocus = () => setActive(true)
    const onBlur = () => {
        setActive(false)
        if(onEditEnd) onEditEnd()
    }

    const labelText = `${text}${required?'*':''}`

    const onInputChanged = (e : any) => {
        if(onChange){
            if(maxInputLength) {
                if(maxInputLength > e.target.value.length) onChange(e.target.value)
            } else {
                onChange(e.target.value)
            }
        }
    }

    return (
        <div className={styles.container + ' flex-column'}>
            {text?<p className={`${styles.label} ${error?styles.error:''}`}>{labelText}</p>:null}
            <div onFocus={onFocus} onBlur={onBlur} className={`${styles.secondContainer} flex-row ${error?styles.secondContainerError: (active?styles.secondContainerActive:'')} ${removeBorder?styles.removeBorder:''}`} >
                {LeftIcon?<LeftIcon onClick={onLeftIconClick?onLeftIconClick:null} className={styles.iconLeft} fill={active?'var(--main-blue-color)':'var(--main-lightgray2-color)'} />:null}
                {disabled?
                    <input disabled onKeyDown={onKeyDown} placeholder={placeholder?placeholder:''} onChange={onInputChanged as any} value={value} type={type}  className={styles.input}/>
                    :<input autoFocus={shouldFocus} onPaste={(e) => {}} onKeyDown={onKeyDown} placeholder={placeholder?placeholder:''} onChange={onInputChanged as any} value={value} type={type}   className={styles.input}/>
                }
                {RightIcon?<RightIcon onClick={onRightIconClick?onRightIconClick:null} className={styles.iconRight} fill={active?'var(--main-blue-color)':'var(--main-black-color)'} />:null}
            </div>
            {error?<Message text={error} type={IMessageTypes.ERROR} />:null}
        </div>
    )
}

export default Input