import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { getUser } from '../../../API/user'
import { getDirectURL } from '../../../config/firebase'
import Navbar from '../../common/Navbar'
import NotificationCard from '../../common/NotificationCard'

import styles from './Notifications.module.css'

const Notifications = () => {
    const [ imageSrc, setImageSrc ] = useState('')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function(user) {
            try {
                if(user) {
                    const user = await getUser( null)
                    if(user && user.data.data){
                        const userData = user.data.data
                        if(userData.profilePicURL) {
                            getDirectURL(userData.profilePicURL).then((url : any) => {
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
                
                <NotificationCard 
                    date={new Date()}
                    text='Your post has been accepted'
                />
            </div>
        </div>
    )
}

export default Notifications