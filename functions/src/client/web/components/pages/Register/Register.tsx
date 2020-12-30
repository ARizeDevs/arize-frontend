import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import PasswordInput from '../../common/inputs/PasswordInput'
import EmailInput from '../../common/inputs/EmailInput'
import AuthFooter from '../../common/AuthFooter'
import SolidButton from '../../common/buttons/SolidButton'
import AuthBackground from '../../common/AuthBackground'

// import axios from '../../../config/api'
import { checkProfile, registerUser } from '../../../API/user'
import firebase from '../../../config/firebase'
import { confirmPasswordValidator, emailValidator, passwordValidator, registerValidator, } from './validators'

import styles from './Register.module.css'
import Loading from '../../common/Loading'

const Register = () => {
    const router = useRouter()
    
    const [ submiting, setSubmiting ] = useState(false)
    const [ eyeOn , setEyeOn ] = useState(true)
    const [ password , setPassword ] = useState('')
    const [ confirmPassword , setConfirmPassword ] = useState('')
    const [ email , setEmail ] = useState('')
    const [ generalError, setGeneralError ] = useState('')
    const [ error, setError ] = useState({} as {[key : string] : string})

    const validateAndSet = (fn : (arg : any) => void, validate : (arg : any) => any) => {
        return (value : any) => {
            fn(value)
            const result = validate(value)
            setError({...error,...result})
        }
    }

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
                    if(result.credential) {
                        await firebase.auth().signInWithCredential(result.credential)
                    }
                    if(checkProfileResult.data.data.profileComplete) {
                        router.push('/profile')
                    } else {
                        router.push('/complete-profile')
                    }
                    setSubmiting(false)
                } catch(error) {
                    console.log(error);
                    
                    setSubmiting(false)
                    if(error && error.response && error.response.data && error.response.data.error){
                        if (error.response.data.error.message && error.response.data.error.message.length < 30){
                            setGeneralError(error.response.data.error.message)
                        }else {
                            if (error.response.data.error.code && error.response.data.error.code.length < 20) {
                                setGeneralError(error.response.data.error.code)
        
                            } else {
                                setGeneralError('something went wrong try later')
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
    } , [])

    const onSubmit = async () => {
        if(submiting) return

        const errorResult = registerValidator(
            email,
            password,
            confirmPassword
        )

        setError(errorResult)
        
        let anyError = false
        Object.values(errorResult).forEach((value) => {
            if(value) anyError = true
        })
        if(anyError) return

        if(password !== confirmPassword) {
            setGeneralError('password and confirm password doesnt match')
            return
        }

        try {
            setSubmiting(true)
            const result = await registerUser(email, '', password)
            await firebase.auth().signInWithEmailAndPassword(email,password)
            if(firebase.auth().currentUser) {
                await (firebase.auth().currentUser as any).sendEmailVerification()
            }
            setSubmiting(false)

            if (result.status === 200 || result.status === 201) {
                router.push('/complete-profile')
            }
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

    const onFacebookClick = () => {
        const provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithRedirect(provider)
        .catch((error) => {
            setGeneralError(error.message)
        })
    }

    const onAppleClick = () => {
        const provider = new firebase.auth.OAuthProvider('apple.com')
        firebase.auth().signInWithRedirect(provider)
        .catch((error) => {
            setGeneralError(error.message)
        })
    }

    return (
        <div className={styles.root}>
            <AuthBackground />
            <div className={styles.loginForm}>
                <div style={{margin:'40px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',height:'100%'}}>
                    <div className={styles.loginRegisterButtonContainer}>
                        <Link href={'/register'}><a><h2>Register</h2></a></Link>
                        <Link href={'/login'}><a><h2 style={{color:'var(--main-deactive-color'}}>Login</h2></a></Link>
                    </div>
                    <div className={styles.inputsContainer}>
                        <EmailInput error={error.email} maxInputLength={100} value={email} onChange={validateAndSet(setEmail, emailValidator)}/>
                        <PasswordInput error={error.password} maxInputLength={40} eyeOn={eyeOn} onEyeClick={() => { setEyeOn(!eyeOn)}} value={password} onChange={validateAndSet(setPassword, passwordValidator)}/>
                        <PasswordInput error={error.confirmPassword} maxInputLength={40} confirm eyeOn={eyeOn} onEyeClick={() => { setEyeOn(!eyeOn)}} value={confirmPassword} onChange={validateAndSet(setConfirmPassword,confirmPasswordValidator(password))}/>
                        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                            <Link href='/forget-password'>
                                <a style={{textAlignLast:'end' , fontWeight : 'normal', marginTop:'16px'}}>
                                    Forgot Password?
                                </a>
                            </Link>
                        </div>    
                    </div>
                    <div className={styles.loginButtonContainer}>
                        <SolidButton onClick={onSubmit} ><h3>Register</h3></SolidButton>
                        <span className={'error-message'}>{generalError}</span>
                    </div>
                    <AuthFooter onAppleClick={onAppleClick} onFacebookClick={onFacebookClick}/>
                    <div style={{width:'100%',marginBottom:'30px'}}>
                        <p>By signing up via Facebook or Apple you agree to the <Link href='/info/terms'><a>Terms</a></Link> & <Link href='/info/privacy-policy'><a>Privacy Policy</a></Link></p>
                    </div>
                </div>
            </div>
            {submiting ? <Loading text='Signing up..' /> : null}
        </div>
    )
}

export default Register