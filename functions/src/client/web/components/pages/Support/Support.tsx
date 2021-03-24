import React, { useEffect, useState } from 'react'
import Navbar from '../../common/Navbar'

import SupportBanner from '../../../../assets/banners/Active Support.svg'
// import TelegramIcon from '../../../../assets/icons/contact icons/Telegram.svg'
import EmailIcon from '../../../../assets/icons/contact icons/email.svg'
import CallIcon from '../../../../assets/icons/contact icons/Call.svg'
// import ChatIcon from '../../../../assets/icons/contact icons/Chat.svg'
// import FAQsIcon from '../../../../assets/icons/contact icons/FAQs.svg'
import FeedBack from '../../../../assets/icons/contact icons/feedback.svg'
import router from 'next/router';

import styles from './Support.module.css'
import firebase from 'firebase'
import { getUser } from '../../../API/user'
import { getDirectURL } from '../../../config/firebase'

const Support = () => {

    const [ imageSrc, setImageSrc ] = useState('')
    const [ accountType, setAccountType ] = useState('')

    useEffect(() => {
        console.log(accountType)
        firebase.auth().onAuthStateChanged(async function(user) {
            try {
                if(user) {
                    const user = await getUser(null)
                    if(user && user.data.data){
                        const userData = user.data.data
                        if(userData.profilePicURL) {
                            getDirectURL(userData.profilePicURL).then((url : any) => {
                                setImageSrc(url)
                            })
                        }
                        setAccountType(userData.accountType)
                    }
                }
            } catch (error) {

            }
        })
    })

    return (
        <div className={styles.root}>
            <Navbar imageSrc={imageSrc} />
            <div className={styles.bodyContainer}>
                    <div className={`${styles.column} ${styles.section}`}>
                       <h2>Need Support?</h2>
                       <br></br>
                       <p>We are here to help you further!<br></br>Please choose one of the support methods below:</p>
                       <br></br>
                       <br></br>
                        <div className={`${styles.row} ${styles.formContainer}`}>
                            <a href="https://share.hsforms.com/1zvmTrSL-QkSpRfuqmNh9Lg5ahuz" className={`${styles.column} ${styles.supportItem}`} >
                                <FeedBack/>
                                <p className={styles.supportItemText}>Feedback</p>
                            </a>
                            <a href="https://share.hsforms.com/1QIeciJ0BTJ-IkSfiR65eRw5ahuz" className={`${styles.column} ${styles.supportItem}`} >
                                <EmailIcon />
                                <p className={styles.supportItemText}>Email</p>
                            </a>
                            <div className={`${styles.column} ${styles.supportItem}`} onClick= {() => router.push('/call-info')}>
                                <CallIcon />
                                <p className={styles.supportItemText}>Call</p>
                            </div>
                        </div>
                    </div>

                <div className={styles.banner}>
                    <SupportBanner />
                </div>
            </div>
        </div>
    )
}

export default Support