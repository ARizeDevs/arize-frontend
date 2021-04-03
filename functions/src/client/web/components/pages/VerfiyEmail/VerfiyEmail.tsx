import React from 'react'
import { useRouter } from 'next/router'

// import Navbar from '../../common/Navbar'

import NewMessageBanner from '../../../../assets/banners/email verify.svg'
import CheckedIcon from '../../../../assets/icons/Checked.svg'

import styles from './VerfiyEmail.module.css'
import SolidButton from '../../common/buttons/SolidButton'

const VerifyEmail = () => {
    const router = useRouter()

    return (
        <div className={styles.root}>
            {/* <Navbar  /> */}
            <div className={styles.bodyContainer}>
                    <div className={`${styles.column} ${styles.section}`}>
                        <div className={styles.row}>
                            <CheckedIcon/>
                            <div className={styles.column} style={{paddingLeft:'10px', paddingTop:'40px'}}>
                                <h1>Congratulations!</h1>
                                <p style={{paddingTop:'10px'}}>Your email has been verified successfully!</p>
                                <p>Enjoy your experience with ARize :)</p>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className={styles.formContainer} style={{paddingLeft:'55px', width:"30%"}} >
                            <SolidButton onClick={() => router.push('/profile')} ><h3>Take Me Home</h3></SolidButton> 
                        </div>
                    </div>
                <div className={styles.banner}>
                    <NewMessageBanner />
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail