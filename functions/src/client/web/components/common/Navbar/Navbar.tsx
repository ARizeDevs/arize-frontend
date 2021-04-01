import React , { useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ARizeLogo from '../ARizeLogo'

import SupportIcon from '../../../../assets/icons/support.svg'
// import BellIcon from '../../../../assets/icons/bell.svg'

import styles from './Navbar.module.css'
import SolidButton from '../buttons/SolidButton'
import ProfileMenu from '../ProfileMenu'
import Hamburger from './Hamburger'
import GeneralModal from '../../common/GeneralModal'
import { IMessageTypes } from '../Message/Message'

interface IProps {
    imageSrc? : string,
    noMenu? : boolean,
    haveMoreSlots? : boolean,
    accountType?: string
}

const rightItems = [
    {
        Icon : SupportIcon,
        href : '/support'
    },
    // {
    //     Icon : BellIcon,
    //     href : '/notifications'
    // },
]

const Navbar = (props : IProps) => {
    const { imageSrc, noMenu, haveMoreSlots } = props

    const [isARStudio,setIsARStudio] = useState(false)
    const [ isPublicRoute, setPublicRoute ] = useState(false)
    const [ arStudioModalOpen, setARStudioModalOpen ] = useState(false)

    const router  = useRouter()

    useLayoutEffect(() => {
        const path = window.history.state.as
        const regex = /\/[\w\-]*/i
        const result = regex.exec(path)
        if(result && result.length > 0) {
            const route = result[0].substr(1)
            if(route === 'forget-password' || route === 'recover-password' ) setPublicRoute(true)
            if(route === 'arstudio')  setIsARStudio(true)
        }   
    } , [])

    // const renderedLeftItems = leftItems.map(({ Icon, href, text }) => {
    //     return  <Link key={text} href={href}>
    //             <a className={styles.navbarLeftItems} >
    //                 <div style={{width:'20px',marginRight:'10px'}}>
    //                     <Icon />
    //                 </div>
    //                 <h3 style={{fontWeight:'normal'}}>{text}</h3>
    //             </a>
    //         </Link>
    // })

    const renderedRightItems = rightItems.map(({ Icon, href }, index) => {
        return  <Link key={index} href={href}>
                <a className={styles.navbarLeftItems} >
                    <div style={{width:'16px',marginRight:'24px'}}>
                        {/* @ts-ignore */}
                        <Icon fill={'black'} />
                    </div>
                </a>
            </Link>
    })

    return (
        <>
        <div className={styles.root}>
            <div className={styles.subContainer}>
                <ARizeLogo />
                {/* {renderedLeftItems} */}
            </div>
            <div className={styles.subContainer}>
                {isPublicRoute?null:
                    <>

                        <div className={styles.hamburgerMenuWrapper}>
                            <Hamburger />
                        </div>

                        <div className={`${styles.desktopItems} ${styles.subContainer}`}>
                            {renderedRightItems}
                            
                            {noMenu?null:<ProfileMenu imageSrc={imageSrc} />}

                            {!isARStudio? 
                            <div className={styles.arStudioButton}>
                                <SolidButton onClick={() => {
                                    if(haveMoreSlots) {
                                        router.push('/arstudio')
                                    } else {
                                        setARStudioModalOpen(true)
                                    }
                                }} >
                                    <h3>Create AR</h3>
                                </SolidButton>
                            </div> : null }
                        </div>
                    </>    
                }
            </div>
        </div>

        <GeneralModal
            buttonText='Upgrade'
            description={'You have reached your maximum number of posts to create new post please upgrade your account'}
            isOpen={arStudioModalOpen}
            onRequestClose={() => setARStudioModalOpen(false)}
            onClick={() => router.push('/pricing')}
            title='No more slots'
            type={IMessageTypes.INFO}
        />

        </>
    )
}

export default Navbar