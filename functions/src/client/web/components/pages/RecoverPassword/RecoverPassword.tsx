import React , { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Navbar from '../../common/Navbar'
import firebase from '../../../config/firebase'
import SolidButton from '../../common/buttons/SolidButton'
import PasswordInput from '../../common/inputs/PasswordInput'

import ForgotPasswordBanner from '../../../../assets/banners/Forgot password.svg'
import PasswordChangdBanner from '../../../../assets/banners/Password changd.svg'
import CheckedIcon from '../../../../assets/icons/Checked.svg'

import styles from './RecoverPassword.module.css'

interface IProp {
    oobCode : string
}

const ForgetPassword = (props : IProp) => {
    const router = useRouter()

    const { oobCode } = props

    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ showPassword, setShowPassword ] = useState(false)
    const [ page, setPage ] = useState(1)
    const [ error, setError ] = useState('')

    useEffect(() => {
        if(page === 2) {
            setTimeout(() => {
                router.push('/login')
            } , 2000)
        }
    })

    const changePassword = () => {
        if(password === confirmPassword) {
            const auth = firebase.auth();
    
            auth.verifyPasswordResetCode(oobCode)
            .then(() => {
                auth.confirmPasswordReset(
                    oobCode, 
                    password
                  ).then(resp => {
                      setPage(2)
                  })
                  .catch(() => {
                    setError('Something went wrong! try again')
                  })
            }).catch(e => {
                router.push('/forget-password')
            })
        } else {
            setError('password and confirm-password do not match')
        }
    }

    return (
        <div className={styles.root}>
            <Navbar  />
            <div className={styles.bodyContainer}>
                {page===1?
                    <div className={styles.column} style={{width:'50%'}}>
                        <h2>Pick a New Password</h2>
                        <p>Type your new password and hit save.</p>
                        <br></br>

                        <div style={{width:'50%'}}>
                            <PasswordInput eyeOn={!showPassword}onEyeClick={() => { setShowPassword(!showPassword)}}  value={password} onChange={setPassword} />
                            <PasswordInput confirm eyeOn={!showPassword}onEyeClick={() => { setShowPassword(!showPassword)}}  value={confirmPassword} onChange={setConfirmPassword} />

                            <SolidButton onClick={changePassword} ><h3>Save New Password</h3></SolidButton>
                            <p style={{color:'red'}}>{error}</p>
                        </div>
                    </div>:
                    <div className={styles.column} style={{width:'50%'}}>
                        <div className={styles.row}>
                            <CheckedIcon />
                            <div className={styles.column}>
                                <h1>Congratulations!</h1>
                                <p>You successfully set up your new password!</p>
                            </div>
                        </div>
                    </div>}
                {page === 1?<ForgotPasswordBanner />:<PasswordChangdBanner />}
            </div>
        </div>
    )
}

export default ForgetPassword