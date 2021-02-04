import React, { useEffect, useState } from 'react'
import Navbar from '../../common/Navbar'
import {useRouter}  from 'next/router'

import SupportBanner from '../../../../assets/banners/Active Support.svg'
import TelegramIcon from '../../../../assets/icons/contact icons/Telegram.svg'
import EmailIcon from '../../../../assets/icons/contact icons/email.svg'
import CallIcon from '../../../../assets/icons/contact icons/Call.svg'
import ChatIcon from '../../../../assets/icons/contact icons/Chat.svg'
import FAQsIcon from '../../../../assets/icons/contact icons/FAQs.svg'
import FeatureReq from '../../../../assets/icons/contact icons/Rocket.svg'

import styles from './Support.module.css'
import firebase from 'firebase'
import { getUser } from '../../../API/user'

const Support = () => {

    const router  = useRouter()
    const [ imageSrc, setImageSrc ] = useState('')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function(user) {
            try {
                if(user) {
                    const user = await getUser(false, null)
                    if(user && user.data.data){
                        const userData = user.data.data
                        if(userData.profilePicURL) {
                            firebase.storage().ref(userData.profilePicURL).getDownloadURL().then((url : any) => {
                                setImageSrc(url)
                            })
                        }
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
                <div className={styles.rowContainer}>
                    <div className={styles.column} style={{width:'50%'}}>
                       <h2>Need Support?</h2>
                       <br></br>
                       <p>We are here to help you further!<br></br>Please choose one of the support methods below:</p>
                       <br></br>
                       <br></br>
                        <div className={styles.row} style={{width:'50%',justifyContent:'space-between'}}>
                            <div className={styles.column2} style={{width:'60px',height:'120px',alignItems:'center'}}>
                                <div /*onClick={() => router.push('/')}*/ style={{cursor:'pointer', width:'60px',height:'60px',alignItems:'center'}}>
                                    <FAQsIcon />
                                </div>
                                <p style={{marginTop:'8px'}}>FAQs</p>
                            </div>
                            <div className={styles.column2} style={{width:'60px',height:'120px',alignItems:'center'}}>
                                <div /*onClick={() => router.push('/')}*/ style={{cursor:'pointer', width:'60px',height:'60px',alignItems:'center'}}>
                                    <ChatIcon  />
                                </div>
                                <p style={{marginTop:'8px'}}>Chat</p>
                            </div>
                            <div className={styles.column2} style={{width:'60px',height:'120px',alignItems:'center'}}>
                            <div onClick={() => router.push('/call-info')} style={{cursor:'pointer', width:'60px',height:'60px',alignItems:'center'}}>
                                <CallIcon />
                                    </div>
                                <p style={{marginTop:'8px'}}>Call</p>
                                </div>
                        </div>
                        <div className={styles.row} style={{width:'50%',justifyContent:'space-between'}}>
                            
                            <div className={styles.column2} style={{width:'60px',height:'120px',alignItems:'center'}}>
                                <div onClick={() => router.push('/problem-support')} style={{cursor:'pointer', width:'60px',height:'60px',alignItems:'center'}}>
                                    <EmailIcon />
                                </div>
                                <p style={{marginTop:'8px'}}>Email</p>
                               
                            </div>
                            <div className={styles.column2} style={{width:'60px',height:'120px',alignItems:'center'}}>
                                <div onClick={() => router.push('/feature-request')} style={{cursor:'pointer', width:'60px',height:'60px',alignItems:'center'}}>
                                        <FeatureReq />
                                    </div>
                                    <p style={{marginTop:'8px'}}>Request Feature</p>
                            </div>
                            <div className={styles.column2} style={{width:'60px',height:'120px',alignItems:'center'}}>
                            <div onClick={() => router.push('')} style={{width:'60px',height:'60px',alignItems:'center'}}>
                             
                                </div>
                                <p style={{marginTop:'8px'}}></p>
                            </div>
                            </div>
                            
                    </div>
                    <div className={styles.banner}>
                        <SupportBanner />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support