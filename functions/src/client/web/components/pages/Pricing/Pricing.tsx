
import { fontsize } from '*.jpg'
import React from 'react'

import Navbar from '../../common/Navbar'

import PlanType from '../../common/PlanType'
import styles from './Pricing.module.css'

const Pricing = () => {
    return (
        <div className={styles.root}>
            <Navbar></Navbar>
            <div className={styles.bodyContainer}>
                <div className={styles.title}>
                    <h2 style={{fontWeight:1000}}>Upgrade and thrive!</h2>
                    <p>We always keep our AR packages up to date for diffrenet customer choices.</p>
                </div>
                <div className={styles.plans}>
                   <PlanType
                        cardTitle='Free'
                        details={[
                        '10 Products',
                        '3D Visualizer',
                        'Augmented reality',
                        'Sharabel link',
                        'Embeded Link',
                        'Analytics'
                        ]}
                    />
                
                   <PlanType
                        details={[
                            '60 Products',
                            '3D Visualizer',
                            'Augmented reality',
                            'Sharabel link',
                            'Embeded Link',
                            'Analytics',
                            'Custome Branding'
                        ]}
                        priceColor='#0078FF'
                        activeBorder='2px solid #FF6F48'
                        priceMonthly={<div className={styles.monthly}><p style={{fontSize:24, fontWeight:900}}>€45</p><p style={{fontSize:22, fontWeight:500}}>/month</p></div>}
                        priceYearly={<div className={styles.monthly}><p style={{fontSize:24, fontWeight:900}}>€495</p><p style={{fontSize:22, fontWeight:500}}>/year</p></div>}
                        titleColor='#FF6F48'
                        cardTitle='Starter'
                        buttonTitle='Upgrade to Starter'
                        buttonColor='#FF6F48'
                   />
                    <PlanType
                        details={[
                            '200 Products',
                            '3D Visualizer',
                            'Augmented reality',
                            'Sharabel link',
                            'Embeded Link',
                            'Analytics',
                            'Custom Branding'
                        ]}
                        priceColor='#0078FF'
                        priceMonthly={<div className={styles.monthly}><p style={{fontSize:24, fontWeight:900}}>€124</p><p style={{fontSize:22, fontWeight:500}}>/month</p></div>}
                        priceYearly={<div className={styles.monthly}><p style={{fontSize:24, fontWeight:900}}>€1,375</p><p style={{fontSize:22, fontWeight:500}}>/year</p></div>}
                        cardTitle='Pro'
                        buttonTitle='Upgrade to Pro'
                        buttonColor='#141323'
                   />
                    <PlanType
                        details={[
                            '200+ Products',
                            '3D Visualizer',
                            'Augmented reality',
                            'Sharabel link',
                            'Embeded Link',
                            'Analytics',
                            'Custom Branding'
                        ]}
                        cardTitle='Enterprise'
                        priceColor='#0078FF'
                        priceMonthly={<p style={{fontSize:24, fontWeight:900}}>Contact Us</p>}
                        buttonTitle='Contact Us'
                        buttonColor='#141323'
                    />
                </div>
            </div>
        </div>
    )
}

export default Pricing