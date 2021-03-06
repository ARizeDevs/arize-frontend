import React from 'react'
import { useRouter } from 'next/router'

import firebase from '../../../config/firebase'

// import RoundImage from '../RoundImage'

import styles from './ProfileMenu.module.css'
import { getUserID } from '../../../API/utils'
import { copyToClipBoard } from '../../../helpers/copyToClipBoard'
import DefaultAvatar from '../../../../assets/icons/default avatar.svg'
import { useToasts } from 'react-toast-notifications'

interface IProps {
    imageSrc? : string,
}

const ProfileMenu = (props : IProps) => {
    const router = useRouter()
    const { addToast } = useToasts()

    const { imageSrc } = props

    const onProfileClick = () => router.push('/profile')
    const onEditProfileClick = () => router.push('/edit-profile')
    const onShareClick = async () => {
        const mobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
        const userID = await getUserID()
    
        const shareURL = `https://arizear.app/profile/${userID}`

        if(mobile) {
            if(typeof window !== 'undefined' && window.navigator) {
                try {
                    await window.navigator.share({ title: "ARize", url: shareURL });
                } catch (err) {
                    console.error("Share failed:", err.message);
                }    
            }
        } else {
            copyToClipBoard(shareURL)
    
            addToast('url copied',{ appearance : 'success' })
        }
        
    }
    const onLogoutClick = () => {
        firebase.auth().signOut()
        .then(() => router.push('/login'))
        .catch((error) => console.log(error))
        
    }

    return (
        <div className={styles.dropDown} >
            <div style={{width:'40px',height:'40px'}}>
                {imageSrc?
                    <img style={{width: '100%',height: '100%',borderRadius: '50%'}} src={imageSrc} />
                    :
                    <DefaultAvatar />
                }
            </div>
            {/* <RoundImage imageSrc={imageSrc} unchangeable size='20px' /> */}
            <div className={styles.dropwDownContent}>
                <div className={styles.dropDownItem} onClick={onProfileClick}>
                    <p>Profile</p>
                </div>
                <div className={styles.dropDownItem} onClick={onEditProfileClick} >
                    <p>Edit Profile</p>
                </div>
                <div className={styles.dropDownItem} onClick={onShareClick}>
                    <p>Share Profile</p>
                </div>
                <div className={styles.dropDownItem} onClick={onLogoutClick}>
                    <p>Log Out</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu