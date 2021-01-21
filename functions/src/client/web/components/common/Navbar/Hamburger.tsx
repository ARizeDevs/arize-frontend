import Modal from 'react-modal'
import React , { useState } from 'react'
import { useRouter } from 'next/router'


import HamburgerIcon from '../../../../assets/icons/hamburger.svg'
import CrossIcon from '../../../../assets/icons/cross.svg'

import styles from './Navbar.module.css'
import { getUserID } from '../../../API/utils'

const Hamburger  = () => {
    const [ menuOpen, setMenuOpen ] = useState(false)

    const router  = useRouter()

    const menuItemst = [
        {
            text : 'Profile',
            onClick : () => router.push('/profile')
        },
        {
            text : 'Edit Profile' ,
            onClick : () => router.push('/edit-profile')
        },
        {
            text : 'Share Profile',
            onClick : async () => {
                if(typeof window !== 'undefined' && window.navigator) {
                    try {
                        const userID = await getUserID()

                        const shareURL = `https://arizear.app/profile/${userID}`
                        await window.navigator.share({ title: "ARize", url: shareURL });
                        console.log("Data was shared successfully");
                    } catch (err) {
                        console.error("Share failed:", err.message);
                    }    
                }
            }
        },
        {
            text : 'Log Out',
            onClick : () => router.push('/login')
        },
    ]
    

    const renderedItems = menuItemst.map(({ text, onClick },index) => {
        return (
            <div onClick={onClick} className={styles.hamburgerMenuItem} key={text}>
                <h1>{text}</h1>
                {index !== menuItemst.length -1 ?<div className={styles.hamburgerMenuDivider}></div>:null}
            </div>
        )
    })

    return (
        <>
            <div onClick={() => setMenuOpen(true)} className={styles.hamburgerMenuIcon}>
                <HamburgerIcon />
            </div>
            <Modal
                isOpen={menuOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setMenuOpen(false)}
                className={styles.hamburgerModal}
                overlayClassName={styles.hambergerModalOverlay}
                contentLabel="Example Modal"
            >
                <div style={{width:'100%',justifyContent:'center',alignItems:'center',height:'100%'}} >
                    <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                        <div onClick={() => setMenuOpen(false)} style={{width:'30px',cursor:'pointer'}}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div className={styles.hamburgerMenuItemsContainer}>
                        {renderedItems}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Hamburger