import React from 'react'

import ArizeLog from '../../../../assets/icons/arize logo black.svg'
import TrashIcon from '../../../../assets/icons/trash-alt.svg'

import styles from './NotificationCard.module.css'

interface IProps {
    imageSrc? : string,
    text? : string,
    date? : Date,
    color? : string
}

const NotificationCard = (props : IProps) => {
    const { imageSrc, text, date, color } = props

    return (
        <div className={styles.root} style={color?{backgroundColor:color}:{}}>
            <div style={{display:'flex',flexDirection:'row'}}>
                {imageSrc?
                    <img src={imageSrc} style={{width:'31px',height:'31px',borderRadius:'50%'}} />:
                    <ArizeLog />}
                <div style={{marginLeft:'16px'}}>
                    <p>{text}</p>
                    <small>{date?date.toDateString():''}</small>
                </div>
            </div>
            <div style={{cursor:'pointer'}}>
                {/* @ts-ignore */}
                <TrashIcon fill='black' />
            </div>
        </div>
    )
}

export default NotificationCard