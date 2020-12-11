import React from  'react'
import RoundImage from '../RoundImage'

import styles from './PostHeader.module.css'

interface IProps {
    userProfilePicURL : string,
    title : string,
    userFullname : string,
    date : string
}

const PostHeader = (props : IProps) => {
    const { userProfilePicURL, title, userFullname, date } = props

    return (
        <div className={styles.root}>
            <div style={{width:'70px',height:'70px', marginRight:'20px' }}>
                <RoundImage imageSrc={userProfilePicURL} unchangeable />
            </div>
            <div className={styles.textContainer}>
                <h3>{title}</h3>
                <p>by</p> <small>{userFullname}</small> <p> / {date}</p>
            </div>
        </div>
    )
}

export default PostHeader