import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import PasswordInput from '../../common/inputs/PasswordInput'
import EmailInput from '../../common/inputs/EmailInput'
import AuthFooter from '../../common/AuthFooter'
import SolidButton from '../../common/buttons/SolidButton'
import AuthBackground from '../../common/AuthBackground'

import firebase, { db } from '../../../config/firebase'
import axios from '../../../config/api'

import styles from './Login.module.css'
import Loading from '../../common/Loading'

const Login = () => {
    const router = useRouter()
    
    const [ submiting, setSubmiting ] = useState(false)
    const [ eyeOn , setEyeOn ] = useState(true)
    const [ password , setPassword ] = useState('')
    const [ email , setEmail ] = useState('')
    const [ generalError, setGeneralError ] = useState('')

    const checkIfProfileIsUpdated = async (uid : string, onFinish : () => void) => {
        const userData: any = await db.collection('users').doc(uid).get()
        if(userData.exists) {
            if (!userData.data().name) {
                router.push('/complete-profile')
                onFinish()
            }else {
                router.push('/profile')
                onFinish()
            }
        } else {
            router.push('/login')
            onFinish()
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
                    const result = await axios.post('/users',{
                        email : user.email,
                        uid : user.uid
                    })
        
                    if (result.status === 200 || result.status === 201) {
                        await checkIfProfileIsUpdated(user.uid, () => setSubmiting(false))
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
                await checkIfProfileIsUpdated(result.user.uid, () => setSubmiting(false))
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
                <br></br>
                <div className={styles.loginRegisterButtonContainer}>
                    <Link href={'/register'}><a><h2 style={{color:'var(--main-deactive-color'}}>Register</h2></a></Link>
                    <Link href={'/login'}><a><h2 >Login</h2></a></Link>
                </div>
                <br></br>
                <div className={styles.inputsContainer}>
                    <EmailInput value={email} onChange={(e:any) => {setEmail(e.target.value)}}/>
                    <PasswordInput eyeOn={eyeOn} onEyeClick={() => { setEyeOn(!eyeOn)}} value={password} onChange={(e:any) => setPassword(e.target.value)}/>
                    <Link href='/forget-password'><a><h4 style={{textAlignLast:'end' , fontWeight : 'normal'}}>Forgot Password?</h4></a></Link>
                </div>
                <br></br>
                <div className={styles.loginButtonContainer}>
                    <SolidButton onClick={onSubmit} ><h3>Login</h3></SolidButton>
                    <span className={'error-message'}>{generalError}</span>
                </div>
                <br></br>
                <AuthFooter onAppleClick={onAppleClick} onFacebookClick={onFacebookClick}/>
                <br></br>
            </div>
            {submiting ? <Loading text='Loging in..' /> : null}
        </div>
    )
}

export default Login