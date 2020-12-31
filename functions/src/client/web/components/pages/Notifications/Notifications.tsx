import React from 'react'
import Navbar from '../../common/Navbar'
import NotificationCard from '../../common/NotificationCard'

import styles from './Notifications.module.css'

const Notifications = () => {
    return (
        <div className={styles.root}>
            <Navbar  />
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