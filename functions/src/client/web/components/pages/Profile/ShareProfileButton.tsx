import React, { useEffect, useState } from 'react'
import { getUserID } from '../../../API/utils'
import { copyToClipBoard } from '../../../helpers/copyToClipBoard'
import SolidButton from '../../common/buttons/SolidButton'

import RoundTick from '../../../../assets/icons/round-tick.svg'

import styles from './Profile.module.css'

interface IProps {
    uid? : string
}



const ShareProfileButton = (props : IProps) => {

    const [ on, setOn ] = useState(false)
    const [ timer, setTimer ] = useState(null)
    const { uid } = props

    const onShareProflie = async () => {
        const mobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
        
        let userID : any = uid? uid:null
        if(!userID) {
            userID = await getUserID()
        }

        const shareURL = `https://arizear.app/profile/${userID}`

        if(mobile) {
            if(typeof window !== 'undefined' && window.navigator) {
                try {
                    await window.navigator.share({ title: "ARize", url: shareURL });
                    console.log("Data was shared successfully");
                } catch (err) {
                    console.error("Share failed:", err.message);
                }    
            }
        } else {
            copyToClipBoard(shareURL)
    
            setOn(true)
            if(timer) {
                clearInterval(timer)
                setTimer(setInterval(() => setOn(false),1000))

            } else {
                setTimer(setInterval(() => setOn(false),1000))
            }
            // addToast('url copied',{ appearance : 'success' })
        }
    }

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setOn(!on)
    //     }, 2000)

    //     return () => {
    //         clearInterval(timer)
    //     }
    // }, [])

    return (
        <>
            <div className={styles.shareProfile} style={{width : '110px'}}>
                <SolidButton styleClass={styles.shareProfileBTN} colorTheme='white' 
                    onClick={onShareProflie} 
                >
                    <h4 style={{color : 'var(--main-blue-color)'}}>Share Profile</h4>
                </SolidButton>
            </div>
            <ShareProfileToast on={on} />
        </>
    )
}

const ShareProfileToast = ({ on } : { on : boolean}) => {
    console.log(on);
    
    return (
        <div className={styles.shareProfileToast} style={{opacity:!on?'0':'1'}}>
            <RoundTick />
            <h4>Profile link copied!</h4>
        </div>
    )
}

export default ShareProfileButton