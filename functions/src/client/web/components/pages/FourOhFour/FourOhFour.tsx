import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Navbar from '../../common/Navbar'

import FOFBanner from '../../../../assets/banners/404.svg'

import styles from './FourOhFour.module.css'
import SolidButton from '../../common/buttons/SolidButton'
import Head from 'next/head'
 
const FourOhFour = () => {
    const router = useRouter()

    useEffect(() => {

    }, [])

    return ( 
    <>
    <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>404</title>
        </Head>
        <div className={styles.root}>
            <Navbar  />
                <div className={styles.bodyContainer}>
                    <FOFBanner />
                    <p>This page could not be found!</p>
                    <div style={{width:'140px'}}>
                        <SolidButton onClick={() => router.push('/profile')} ><h3>Take Me Home</h3></SolidButton> 
                    </div>
                </div>
            </div>
    </>
    )
}

export default FourOhFour