import React , { useState } from 'react'
import Navbar from '../../common/Navbar'
import { useRouter } from 'next/router'

import firebase from '../../../config/firebase'

import ForgotPasswordBanner from '../../../../assets/banners/Forgot password.svg'
import NewMessageBanner from '../../../../assets/banners/New message.svg'
import CheckedIcon from '../../../../assets/icons/Checked.svg'

import styles from './ForgotPassword.module.css'
import EmailInput from '../../common/inputs/EmailInput'
import SolidButton from '../../common/buttons/SolidButton'

const ForgetPassword = () => {
    const router = useRouter()

    const [ email, setEmail ] = useState('')
    const [ page, setPage ] = useState(1)
    const [ error, setError ] = useState('')

    const recoverPassword = () => {
        const auth = firebase.auth();
        
        auth.sendPasswordResetEmail(email).then(function() {
            setPage(2)    
        }).catch(() => {
            setError('Something went wrong! try again')
        })
    }

    return (
        <div className={styles.root}>
            <Navbar noMenu />
            <div className={styles.bodyContainer}>
                {page===1?
                    <div className={`${styles.column} ${styles.section}`}>
                        <h2>Recover Password</h2>
                        <p>Forgot your password?
                            Then cool down and type your email address retrieve it!</p>
                        <br></br>
                        <div className={styles.formContainer}>
                            <EmailInput text={"Email address"} value={email} onChange={setEmail} />
                            <SolidButton onClick={recoverPassword} ><h3>Recover Password</h3></SolidButton>
                        </div>
                        <p style={{color:'red'}}>{error}</p>
                    </div>:
                    <div className={`${styles.column} ${styles.section}`}>
                        <div className={styles.row}>
                            <CheckedIcon />
                            <div className={styles.column} style={{paddingLeft:'10px'}} >
                                <h1>Check Your Email Inbox!</h1>
                                <p>We have sent a link to your email to recover your password</p>
                            </div>
                        </div>
                        <br></br>
                        <div className={styles.row} style={{width:'40%', paddingLeft:'60px'}}>
                            <SolidButton onClick={() => router.push('/login')} ><h3>Go to login</h3></SolidButton>
                        </div>
                    </div>}
                <div className={styles.banner}>
                    {page === 1?<ForgotPasswordBanner />:<NewMessageBanner />}
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword