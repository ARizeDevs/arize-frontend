import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import PasswordInput from '../../common/inputs/PasswordInput'
import EmailInput from '../../common/inputs/EmailInput'
import AuthFooter from '../../common/AuthFooter'
import SolidButton from '../../common/buttons/SolidButton'
import AuthBackground from '../../common/AuthBackground'

// import axios from '../../../config/api'
import { registerUser } from '../../../API/user'
import firebase from '../../../config/firebase'

import styles from './Register.module.css'
import Loading from '../../common/Loading'

const Login = () => {
    const router = useRouter()
    
    const [ submiting, setSubmiting ] = useState(false)
    const [ eyeOn , setEyeOn ] = useState(true)
    const [ password , setPassword ] = useState('')
    const [ confirmPassword , setConfirmPassword ] = useState('')
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
                    const result = await registerUser(user.email as string, user.uid, '')
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

        if(password !== confirmPassword) {
            setGeneralError('password and confirm password doesnt match')
            return
        }

        try {
            setSubmiting(true)
            const result = await registerUser(email, '', password)
            console.log(result)
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
                <br></br>
                <div className={styles.loginRegisterButtonContainer}>
                    <Link href={'/register'}><a><h2>Register</h2></a></Link>
                    <Link href={'/login'}><a><h2 style={{color:'var(--main-deactive-color'}}>Login</h2></a></Link>
                </div>
                <br></br>
                <div className={styles.inputsContainer}>
                    <EmailInput value={email} onChange={(e:any) => {setEmail(e.target.value)}}/>
                    <PasswordInput eyeOn={eyeOn} onEyeClick={() => { setEyeOn(!eyeOn)}} value={password} onChange={(e:any) => setPassword(e.target.value)}/>
                    <PasswordInput confirm eyeOn={eyeOn} onEyeClick={() => { setEyeOn(!eyeOn)}} value={confirmPassword} onChange={(e:any) => setConfirmPassword(e.target.value)}/>
                    <Link href='/forget-password'><a><h4 style={{textAlignLast:'end' , fontWeight : 'normal'}}>Forgot Password?</h4></a></Link>
                </div>
                <br></br>
                <div className={styles.loginButtonContainer}>
                    <SolidButton onClick={onSubmit} ><h3>Register</h3></SolidButton>
                    <span className={'error-message'}>{generalError}</span>
                </div>
                <br></br>
                <AuthFooter onAppleClick={onAppleClick} onFacebookClick={onFacebookClick}/>
                <br></br>
            </div>
            {submiting ? <Loading text='Signing up..' /> : null}
        </div>
    )
}

export default Login