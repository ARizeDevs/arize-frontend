import React from 'react'

import styles from './RemainingSlots.module.css'

interface IProps {
    maxSlots : number ,
    usedSlots : number
}

const RemainingSlots = (props : IProps) => {
    const { maxSlots, usedSlots } = props
    const remainingSlots = maxSlots - usedSlots

    const widthPercent = Math.round((remainingSlots / maxSlots)*100)
    
    let color = 'var(--main-blue-color)'

    if(widthPercent < 50) {
        color = 'var(--main-yellow-color)'
    } 

    if (widthPercent < 20) {
        color = 'var(--main-red-color)'
    }

    return (
        <div className={styles.root}>
            <div className={styles.textContainer}>
                <h4 >Remaining AR Slots</h4>
                <h4>{remainingSlots}</h4>
            </div>
            <div className={styles.root}>
                <h5 style={{paddingTop:'10px', textAlign:'left'}}>This means the number of products you can upload to your ARize account to have 3D and AR avliable for them</h5>
            </div>
            <br></br>
            <div className={styles.progressBar}>
                <div className={styles.progressBarProgress} style={{width:widthPercent+'%' , backgroundColor: color}}>
                </div>
            </div>
        </div>
    )
}

export default RemainingSlots