import React from 'react'
import Link from 'next/link'

import AppleIcon from '../../../../assets/icons/apple.svg'
import FacebookIcon from '../../../../assets/icons/facebook.svg'

import styles from './AuthFooter.module.css'

interface IProps {
    onFacebookClick : () => void,
    onAppleClick : () => void,
}

const AuthFooter = (props : IProps) => {
    const { onFacebookClick, onAppleClick} = props

    return (
        <div className={styles.footerContainer + ' flex-column'}>
                <div className={styles.dividerContainer}>
                    <div className={styles.verticalDivider}></div>
                    Or
                    <div className={styles.verticalDivider}></div>
                </div>
                <br></br>
                <div className='flex-row'>
                    <span className={styles.providerContainer} onClick={onFacebookClick}>
                        <FacebookIcon />&nbsp;
                    </span>
                    <span className={styles.providerContainer} onClick={onAppleClick}>
                        <AppleIcon />
                    </span>
                </div>
                <div style={{width:'90%'}}>
                    <p>By signing up via Facebook or Apple you agree to the <Link href='/info/terms'><a>Terms</a></Link> & <Link href='/info/privacy-policy'><a>Privacy Policy</a></Link></p>
                </div>
        </div>
    )
}

export default AuthFooter