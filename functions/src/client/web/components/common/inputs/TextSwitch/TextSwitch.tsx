import React from 'react'

import styles from './TextSwitch.module.css'

interface IProps {
    text1 : string,
    text2 : string,
    isOn : boolean,
    setIsOn : (value : boolean) => void
}

const TextSwitch = (props : IProps) => {
    const { isOn, setIsOn, text1, text2 } = props

    return (
        <label className={styles.switch}>

            <input type="checkbox"  checked={isOn} onChange={(e : any) => setIsOn(e.target.checked)} />
            
            <span className={`${styles.slider} ${styles.round}`}>
                <p className={styles.toggleText1}>{text1}</p>
                <p className={styles.toggleText2}>{text2}</p>
            </span>
            
        </label>            
    )
}

export default TextSwitch