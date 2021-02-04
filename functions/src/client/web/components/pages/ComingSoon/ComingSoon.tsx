import React from 'react'

import Navbar from '../../common/Navbar'

import ComingSoonBanner from '../../../../assets/banners/coming-soon.svg'

import styles from './ComingSoon.module.css'
 
const ComingSoon = () => {

    return ( 
    <>
        <div className={styles.root}>
            <Navbar  />
                <div className={styles.bodyContainer}>
                    <div style={{width:'100%'}}>
                        <h1>Coming Soon...</h1>
                        <p>We are working hard on this feature and will realese it soon :)</p>
                    </div>
                    <div className={styles.banner}>
                        <ComingSoonBanner />
                    </div>
                    {/* <div style={{width:'140px'}}>
                        <SolidButton onClick={() => router.push('/profile')} ><h3>Take Me Home</h3></SolidButton> 
                    </div> */}
                </div>
            </div>
    </>
    )
}

export default ComingSoon