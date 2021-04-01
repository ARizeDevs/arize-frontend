import React , { useState, useEffect } from 'react'

import Navbar from '../../common/Navbar'
import Message from '../../common/Message'
import { IMessageTypes } from '../../common/Message/Message'

import styles from './CallInfo.module.css'
import ProblemSupportBanner from '../../../../assets/banners/ProblemSupport.svg'
import firebase from 'firebase'
import { getUser } from '../../../API/user'
import { getDirectURL } from '../../../config/firebase'


const CallInfo = () => {

    const [ imageSrc, setImageSrc ] = useState('')
    const [ postCount, setPostCount] = useState(0);
    const [ maxSlots, setMaxSlots] = useState(3); 

    useEffect(() => {
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

                        setPostCount(userData.postsCount);
                        setMaxSlots(userData.maxSlots);

                    }
                }
            } catch (error) {
                
            }
        })
    })

    return (
        <div className={styles.root}>
           <Navbar imageSrc={imageSrc} haveMoreSlots={maxSlots - postCount > 0}/>
            <div className={styles.bodyContainer}>
                <div className={styles.rowContainer}>  
                    <div className={styles.column}>
                        <div>
                        <h2>Call us for support!</h2>
                        <p>We are here to help you further!</p>
                        <br></br>
                        </div>
                        <div className={styles.column2} style={{width:'100%'}}>
                            <div className={styles.row}>
                                    <Message 
                                        text='Monday - Friday from 8:30-17:30'
                                        type={IMessageTypes.SUCCESS}
                                     />
                            </div>
                             <br></br>
                            <a href="tel:31792033163" className={styles.num}>+31792033163 (Dutch and English) </a>
                            <br></br>
                    
                        </div>
                    </div>
                    <div className={styles.banner}>
                    <ProblemSupportBanner/>
                    </div>
                    </div>
               
            </div>
        </div>
    )
}

export default CallInfo