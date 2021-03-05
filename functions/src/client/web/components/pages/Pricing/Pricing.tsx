import React , { useState, useEffect } from 'react'
import Navbar from '../../common/Navbar'
import PlanType from '../../common/PlanType'
import styles from './Pricing.module.css'
import firebase from 'firebase'
import { getUser } from '../../../API/user'

const Pricing = () => {
    const [ imageSrc, setImageSrc ] = useState('')
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function(user) {
            try {
                if(user) {
                    const user = await getUser(null)
                    if(user && user.data.data){
                        const userData = user.data.data
                        if(userData.profilePicURL) {
                            firebase.storage().ref(userData.profilePicURL).getDownloadURL().then((url : any) => {
                                setImageSrc(url)
                            })
                        }
                    }
                }
            } catch (error) {

            }
        })
    })


    return (
        <div className={styles.root}>
            <Navbar imageSrc={imageSrc} />   
            <div className={styles.bodyContainer}>
                <div className={styles.title}>
                    <h2 style={{fontWeight:1000}}>Upgrade and thrive!</h2>
                    <p>We always keep our AR packages up to date for diffrenet customer choices.</p>
                </div>
                <div className={styles.plans}>
                   <PlanType
                        cardTitle='Free'
                        productNum='10'
                        details={[
                        {title:'3D Visualizer', checked:true},
                        {title:'Augmented reality', checked:true},
                        {title:'Sharabel link', checked:true},
                        {title:'Embeded Link', checked:true},
                        {title:'Analytics', checked:false},
                        {title:'Custome Branding', checked:false},
                        {title:'Email Support', checked:true},
                        {title:'Phone Chat/Support', checked:false},
                        ]}
                    />
                
                   <PlanType
                        productNum='60'
                        details={[
                            {title:'3D Visualizer', checked:true},
                            {title:'Augmented reality', checked:true},
                            {title:'Sharabel link', checked:true},
                            {title:'Embeded Link', checked:true},
                            {title:'Analytics', checked:true},
                            {title:'Custome Branding', checked:true},
                            {title:'Email Support', checked:true},
                            {title:'Phone Chat/Support', checked:true},
                            ]}
                        priceColor='#0078FF'
                        activeBorder='2px solid #FF6F48'
                        priceMonthly={<div className={styles.monthly}>
                                <p style={{fontSize:24, fontWeight:900}}>€45</p>
                                <p style={{fontSize:22, fontWeight:500}}>/month</p>
                            </div>}
                        priceYearly={<div className={styles.monthly}>
                                <p style={{fontSize:24, fontWeight:900}}>€495</p>
                                <p style={{fontSize:22, fontWeight:500}}>/year</p>
                            </div>}
                        titleColor='#FF6F48'
                        cardTitle='Starter'
                        buttonTitle='Upgrade to Starter'
                        buttonColor='#FF6F48'
                   />
                    <PlanType
                        productNum='200'
                        details={[
                            {title:'3D Visualizer', checked:true},
                            {title:'Augmented reality', checked:true},
                            {title:'Sharabel link', checked:true},
                            {title:'Embeded Link', checked:true},
                            {title:'Analytics', checked:true},
                            {title:'Custome Branding', checked:true},
                            {title:'Email Support', checked:true},
                            {title:'Phone Chat/Support', checked:true},
                            ]}
                        priceColor='#0078FF'
                        priceMonthly={<div className={styles.monthly}>
                            <p style={{fontSize:24, fontWeight:900}}>€124</p>
                            <p style={{fontSize:22, fontWeight:500}}>/month</p></div>}
                        priceYearly={<div className={styles.monthly}>
                            <p style={{fontSize:24, fontWeight:900}}>€1,375</p>
                            <p style={{fontSize:22, fontWeight:500}}>/year</p>
                            </div>}
                        cardTitle='Pro'
                        buttonTitle='Upgrade to Pro'
                        buttonColor='#141323'
                   />
                    <PlanType
                        productNum='200+'
                        details={[
                            {title:'3D Visualizer', checked:true},
                            {title:'Augmented reality', checked:true},
                            {title:'Sharabel link', checked:true},
                            {title:'Embeded Link', checked:true},
                            {title:'Analytics', checked:true},
                            {title:'Custome Branding', checked:true},
                            {title:'Email Support', checked:true},
                            {title:'Phone Chat/Support', checked:true},
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