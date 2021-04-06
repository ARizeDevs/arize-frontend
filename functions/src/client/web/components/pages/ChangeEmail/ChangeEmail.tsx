import React , { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Navbar from '../../common/Navbar'
import SolidButton from '../../common/buttons/SolidButton'
import EmailInput from '../../common/inputs/EmailInput'

import { changeEmailAPI } from '../../../API/user'

import EmailVerifyBanner from '../../../../assets/banners/email verify.svg'
import EmailVerifyCompleteBanner from '../../../../assets/banners/New message2.svg'
import CheckedIcon from '../../../../assets/icons/Checked.svg'

import styles from './ChangeEmail.module.css'
import Loading from '../../common/Loading'
import Message from '../../common/Message'
import { IMessageTypes } from '../../common/Message/Message'


const ChangeEmail = () => {
    const router = useRouter()

    const [ currentEmail, setCurrentEmail ] = useState('')
    const [ newEmail, setNewEmail ] = useState('')
    const [ page, setPage ] = useState(1)
    const [ error, setError ] = useState('')
    const [ submiting, setSubmiting] = useState(false)

    useEffect(() => {
        if(page === 2) {
            setTimeout(() => {
                router.push('/login')
            } , 2000)
        }
    })

    const changeEmail = async () => {
        setSubmiting(true)

        try {
            await changeEmailAPI(newEmail)

            setPage(2)
        } catch(error) {
            setError('something went wrong')
        } finally {
            setSubmiting(false)
        }
    }

    return (
        <div className={styles.root}>
            <Navbar noMenu  />
            <div className={styles.bodyContainer}>
                {page===1?
                    <div className={`${styles.column} ${styles.section}`}>
                        <h2>Change Email</h2>
                        <p>Enter your current email and then your new email.</p>
                        <br></br>

                        <div className={styles.formContainer}>
                            <EmailInput text='Current Email' value={currentEmail} onChange={setCurrentEmail} />
                            <EmailInput text='New Email' value={newEmail} onChange={setNewEmail} />

                            <SolidButton onClick={changeEmail} ><h3>Change Email</h3></SolidButton>
                            {error?<Message text={error} type={IMessageTypes.ERROR} />:null}
                        </div>
                    </div>:
                    <div className={`${styles.column} ${styles.section}`}>
                        <div className={styles.row}>
                            <CheckedIcon />
                            <div className={styles.column}>
                                <h1>Congratulations!</h1>
                                <p>Your email has beed changed successfully.</p>
                            </div>
                        </div>
                    </div>}
                <div className={styles.banner}>
                    {page === 1?<EmailVerifyBanner />:<EmailVerifyCompleteBanner />}
                </div>
            </div>
            {submiting ? <Loading text='Changing your email address...' />:null}
        </div>
    )
}

export default ChangeEmail