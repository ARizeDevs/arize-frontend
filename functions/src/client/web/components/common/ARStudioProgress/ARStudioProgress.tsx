import React from 'react'

import ProgressIcon from '../../../../assets/icons/progress.svg'

import styles from './ARStudioProgress.module.css'

interface IProps {
    title : string,
    description : string,
    progress : number
}

const ARStudioProgress = ( props : IProps ) => {
    const { title, description, progress } = props

    return (
        <div className={styles.device} style={{background : 'url(/images/ios-phone.png)'}}>
            <div style={{width:'70%'}}>
                <ProgressIcon />
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',width:'70%'}}>
                <h3>{title}</h3>
                <br></br>
                <p>{description}</p>
                <br></br>
                <br></br>
                <div className={styles.progressBar}>
                    <div className={styles.progressBarProgress} style={{width:progress+'%'}}>
                    </div>
                </div>
                <h3 style={{color:'var(--main-blue-color)',fontWeight:'normal'}}>{progress + '%'}</h3>
            </div>
        </div>
    )
}

export default ARStudioProgress