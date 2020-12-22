import React, { useState } from 'react'
import Link from 'next/link'

import AppleIcon from '../../../../assets/icons/apple.svg'
import FacebookIcon from '../../../../assets/icons/facebook.svg'
import AppleActiveIcon from '../../../../assets/icons/apple-active.svg'
import FacebookActiveIcon from '../../../../assets/icons/facebook-active.svg'

import styles from './AuthFooter.module.css'

interface IProps {
    onFacebookClick : () => void,
    onAppleClick : () => void,
}

const AuthFooter = (props : IProps) => {
    const { onFacebookClick, onAppleClick} = props

    const [ appleActive, setAppleActive ] = useState(false)
    const [ facebookActive, setFacebookActive ] = useState(false)

    return (
        <div className={styles.footerContainer + ' flex-column'}>
                <div className={styles.dividerContainer}>
                    <div className={styles.verticalDivider}></div>
                    Or
                    <div className={styles.verticalDivider}></div>
                </div>
                <br></br>
                <div className='flex-row'>
                    <span onMouseEnter={() => setAppleActive(true)} onMouseLeave={() => setAppleActive(false)} className={styles.providerContainer} onClick={onAppleClick}>
                        {appleActive?<AppleIcon />:<AppleActiveIcon />}&nbsp;
                    </span>
                    <span onMouseEnter={() => setFacebookActive(true)} onMouseLeave={() => setFacebookActive(false)} className={styles.providerContainer} onClick={onFacebookClick}>
                        {facebookActive?<FacebookIcon />:<FacebookActiveIcon />}
                    </span>
                </div>
               
        </div>
    )
}

export default AuthFooter