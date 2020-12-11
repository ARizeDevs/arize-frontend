import React from 'react'
import { useRouter } from 'next/router'

import Navbar from '../../common/Navbar'

import NewMessageBanner from '../../../../assets/banners/New message.svg'
import CheckedIcon from '../../../../assets/icons/Checked.svg'

import styles from './VerfiyEmail.module.css'
import SolidButton from '../../common/buttons/SolidButton'

const VerifyEmail = () => {
    const router = useRouter()

    return (
        <div className={styles.root}>
            <Navbar  />
            <div className={styles.bodyContainer}>
                    <div className={styles.column} style={{width:'50%'}}>
                        <div className={styles.row}>
                            <CheckedIcon />
                            <div className={styles.column}>
                                <h1>Congratulations!</h1>
                                <p>Your email has been verified successfully! Enjoy your experience with ARize :)</p>
                            </div>
                        </div>
                        <div style={{width:'50%'}}>
                            <SolidButton onClick={() => router.push('/profile')} ><h3>Take Me Home</h3></SolidButton> 
                        </div>
                    </div>
                <NewMessageBanner />
            </div>
        </div>
    )
}

export default VerifyEmail