import React from 'react'
import Message from '../../Message'
import { IMessageTypes } from '../../Message/Message'

import styles from './Slider.module.css'

interface IProps {
    text : string,
    min : number,
    max : number,
    value : number,
    onChange : (number) => void,
    error? : string
}

const Slider = (props : IProps ) => {
    const { text, error, min, max, value, onChange } = props

    return (
        <div className={styles.container + ' flex-column'}>
            {text?<p className={`${styles.label} ${error?styles.error:''}`}>{text}</p>:null}
            <div className={styles.sliderContainer}>
                <input type="range" min={min.toString()} max={max.toString()} value={value} onChange={(e : any) => onChange(e.target.value)} className={styles.slider} />
                <p className={styles.sliderValue}>{value/10}</p>
            </div>
            {error?<Message text={error} type={IMessageTypes.ERROR} />:null}
        </div>
    )
}

export default Slider