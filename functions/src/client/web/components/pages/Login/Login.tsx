import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import PasswordInput from '../../common/inputs/PasswordInput'
import EmailInput from '../../common/inputs/EmailInput'
import AuthFooter from '../../common/AuthFooter'
import SolidButton from '../../common/buttons/SolidButton'
import AuthBackground from '../../common/AuthBackground'

import firebase from '../../../config/firebase'

import styles from './Login.module.css'
import Loading from '../../common/Loading'
import { checkProfile } from '../../../API/user'

const Login = () => {
    const router = useRouter()
    
    const [ submiting, setSubmiting ] = useState(false)
    const [ eyeOn , setEyeOn ] = useState(true)
    const [ password , setPassword ] = useState('')
    const [ email , setEmail ] = useState('')
    const [ generalError, setGeneralError ] = useState('')

    useEffect(() => {
        firebase.auth().signOut()
        .catch((err) => console.log(err))

        firebase.auth().getRedirectResult()
        .then(async (result) => {
            const { user } = result

            if (user) {
                try {
                    setSubmiting(true)
                   
                    const checkProfileResult = await checkProfile(user.uid,user.email)
                    if(checkProfileResult.data.data.data.profileComplete) {
                        router.push('/profile')
                    } else {
                        router.push('/complete-profile')
                    }
                    setSubmiting(false)
                } catch(error) {
                    setSubmiting(false)
        
                    if(error && error.response && error.response.data && error.response.data.error){
                        if (error.response.data.error.message && error.response.data.error.message.length < 30){
                            setGeneralError(error.response.data.error.message)
                        }else {
                            if (error.response.data.error.code && error.response.data.error.code.length < 20) {
                                setGeneralError(error.response.data.error.code)

                            } else {
                                setGeneralError('something went wrong')
                            }
                        }
                    }  else {
                        setGeneralError('something went wrong try later')
                    }
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const onSubmit = async () => {
        if(submiting) return
        try {
            setSubmiting(true)

            const result = await firebase.auth().signInWithEmailAndPassword(email, password)
            if(result && result.user) {
                const checkProfileResult = await checkProfile(result.user.uid, result.user.email)
                if(checkProfileResult.data.data.data.profileComplete) {
                    router.push('/profile')
                    setSubmiting(false)
                } else {
                    router.push('/complete-profile')
                    setSubmiting(false)
                }
            } else {
                setSubmiting(false)
            }
        } catch(error) {
            console.log(error)
            setGeneralError(error.message)
            setSubmiting(false)
        }
    }

    const onFacebookClick = () => { 
        const provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithRedirect(provider)
        .catch((error) => {
            setGeneralError(error)
        })
    }

    const onAppleClick = () => {
        const provider = new firebase.auth.OAuthProvider('apple.com')
        firebase.auth().signInWithRedirect(provider)
        .catch((error) => {
            setGeneralError(error)
        })
    }

    return (
        <div className={styles.root}>
            <AuthBackground />
            <div className={styles.loginForm}>
                <div style={{margin:'40px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',height:'100%'}}>
                    <div className={styles.loginRegisterButtonContainer}>
                        <Link href={'/register'}><a><h2 style={{color:'var(--main-deactive-color'}}>Register</h2></a></Link>
                        <Link href={'/login'}><a><h2 >Login</h2></a></Link>
                    </div>
                    <div className={styles.inputsContainer}>
                        <EmailInput value={email} onChange={setEmail}/>
                        <PasswordInput eyeOn={eyeOn} onEyeClick={() => { setEyeOn(!eyeOn)}} value={password} onChange={setPassword}/>
                        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                            <Link href='/forget-password'>
                                <a style={{textAlignLast:'end' , fontWeight : 'normal', marginTop:'16px'}}>
                                    Forgot Password?
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.loginButtonContainer}>
                        <SolidButton onClick={onSubmit} ><h3>Login</h3></SolidButton>
                        <span className={'error-message'}>{generalError}</span>
                    </div>
                    <AuthFooter onAppleClick={onAppleClick} onFacebookClick={onFacebookClick}/>
                    <div style={{width:'100%',marginBottom:'40px'}}>
                        <p>By signing up via Facebook or Apple you agree to the <Link href='/info/terms'><a>Terms</a></Link> & <Link href='/info/privacy-policy'><a>Privacy Policy</a></Link></p>
                    </div>
                </div>
            </div>
            {submiting ? <Loading text='Loging in..' /> : null}
        </div>
    )
}

export default Login