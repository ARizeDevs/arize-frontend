import React, { useState } from 'react'

import styles from './Input.module.css'

interface IProps {
    text : string,
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
    onKeyDown? : (e : any) => void
}

const Input = (props : IProps) => {
    const { text, required, LeftIcon, RightIcon, type, onLeftIconClick, onRightIconClick, onChange, value, placeholder, removeBorder, onKeyDown } = props
    const [ active, setActive ] = useState(false)

    const onFocus = () => setActive(true)
    const onBlur = () => setActive(false)

    const labelText = `${text}${required?'*':''}`

    return (
        <div className={styles.container + ' flex-column'}>
            <p className={styles.label}>{labelText}</p>
            <div className={`${styles.secondContainer} flex-row ${active?styles.secondContainerActive:''} ${removeBorder?styles.removeBorder:''}`} >
                {LeftIcon?<LeftIcon onClick={onLeftIconClick?onLeftIconClick:null} className={styles.iconLeft} fill={active?'var(--main-blue-color)':'var(--main-lightgray2-color)'} />:null}
                <input onKeyDown={onKeyDown} placeholder={placeholder?placeholder:''} onChange={onChange as any} value={value} type={type} onFocus={onFocus} onBlur={onBlur} className={styles.input}/>
                {RightIcon?<RightIcon onClick={onRightIconClick?onRightIconClick:null} className={styles.iconRight} fill={active?'var(--main-blue-color)':'var(--main-black-color)'} />:null}
            </div>
        </div>
    )
}

export default Input