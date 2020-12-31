import React from 'react'
import Navbar from '../../common/Navbar'

import SupportBanner from '../../../../assets/banners/Active Support.svg'
import TelegramIcon from '../../../../assets/icons/contact icons/Telegram.svg'
import EmailIcon from '../../../../assets/icons/contact icons/email.svg'
import CallIcon from '../../../../assets/icons/contact icons/Call.svg'
import ChatIcon from '../../../../assets/icons/contact icons/Chat.svg'
import FAQsIcon from '../../../../assets/icons/contact icons/FAQs.svg'
import BugReportIcon from '../../../../assets/icons/contact icons/report bug.svg'

import styles from './Support.module.css'

const Support = () => {
    return (
        <div className={styles.root}>
            <Navbar  />
            <div className={styles.bodyContainer}>
                    <div className={styles.column} style={{width:'50%'}}>
                       <h2>Need Support?</h2>
                       <p>We are here to help you further!<br></br>Please choose one of the support methods below:</p>
                       <br></br>
                       <br></br>
                        <div className={styles.row} style={{width:'70%',justifyContent:'space-evenly'}}>
                            <div className={styles.column} style={{width:'100%',alignItems:'center'}}>
                                <FAQsIcon />
                                <p>FAQs</p>
                            </div>
                            <div className={styles.column} style={{width:'100%',alignItems:'center'}}>
                                <TelegramIcon />
                                <p>Telegram</p>
                            </div>
                            <div className={styles.column} style={{width:'100%',alignItems:'center'}}>
                                <CallIcon />
                                <p>Call</p>
                            </div>
                        </div>
                        <br></br>
                        <div className={styles.row} style={{width:'70%',justifyContent:'space-evenly'}}>
                            <div className={styles.column} style={{width:'100%',alignItems:'center'}}>
                                <ChatIcon />
                                <p>Chat</p>
                            </div>
                            <div className={styles.column} style={{width:'100%',alignItems:'center'}}>
                                <EmailIcon />
                                <p>Email</p>
                            </div>
                            <div className={styles.column} style={{width:'100%',alignItems:'center'}}>
                                <BugReportIcon />
                                <p>Report <br></br>a Bug</p>
                            </div>
                        </div>
                    </div>
                <SupportBanner />
            </div>
        </div>
    )
}

export default Support