import React , { useState, useEffect } from 'react'
import Navbar from '../../common/Navbar'
import PlanType from '../../common/PlanType'
import styles from './Pricing.module.css'
import firebase from 'firebase'
import { getUser } from '../../../API/user'
import UpgradeModal from '../../common/UpgradeModal';
import { getDirectURL } from '../../../config/firebase'

const Pricing = () => {
    
    const [ imageSrc, setImageSrc ] = useState('')
    const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function(user) {
            try {
                if(user) {
                    const user = await getUser(null)
                    if(user && user.data.data){
                        const userData = user.data.data
                        if(userData.profilePicURL) {
                            getDirectURL(userData.profilePicURL).then((url : any) => {
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
                        productNum='3'
                        details={[
                            {title:'Up to 1,500 views', checked:true},
                            {title:'3D Visualizer', checked:true},
                            {title:'Augmented reality', checked:true},
                            {title:'Shareable link', checked:true},
                            {title:'Embedded link', checked:true},
                            {title:'Analytics', checked:false},
                            {title:'Custom branding', checked:false},
                            {title:'Email Support', checked:true},
                            {title:'Phone / Chat Support', checked:false},
                        ]}
                    />
                
                   <PlanType
                        productNum='50'
                        details={[
                            {title:'2K+ views, €0.01 / view', checked:true},
                            {title:'3D Visualizer', checked:true},
                            {title:'Augmented reality', checked:true},
                            {title:'Shareable link', checked:true},
                            {title:'Embedded link', checked:true},
                            {title:'Analytics', checked:true},
                            {title:'Custom branding', checked:true},
                            {title:'Email Support', checked:true},
                            {title:'Phone / Chat Support', checked:true},
                            ]}
                        priceMonthly={<div className={styles.monthly}>
                                <p style={{fontSize:24, fontWeight:900}}>€50 </p>
                                <p style={{fontSize:22, fontWeight:500}}>/ month</p>
                            </div>}
                        priceYearly={<div className={styles.monthly}>
                                <p style={{fontSize:24, fontWeight:900}}>€550</p>
                                <p style={{fontSize:22, fontWeight:500}}>/ year</p>
                            </div>}
                        cardTitle='Starter'
                        buttonTitle='Upgrade to Starter'
                        buttonColor='#141323'
                        onClick= {() => {setUpgradeModalOpen(true)}}
                   />
                    <PlanType
                        productNum='120'
                        details={[
                            {title:'4K+ views, €0.01 / view', checked:true},
                            {title:'3D Visualizer', checked:true},
                            {title:'Augmented reality', checked:true},
                            {title:'Shareable link', checked:true},
                            {title:'Embedded link', checked:true},
                            {title:'Analytics', checked:true},
                            {title:'Custom branding', checked:true},
                            {title:'Email Support', checked:true},
                            {title:'Phone / Chat Support', checked:true},
                            ]}
                        priceColor='#0078FF'
                        activeBorder='2px solid #FF6F48'
                        priceMonthly={<div className={styles.monthly}>
                            <p style={{fontSize:24, fontWeight:900}}>€100</p>
                            <p style={{fontSize:22, fontWeight:500}}>/ month</p></div>}
                        priceYearly={<div className={styles.monthly}>
                            <p style={{fontSize:24, fontWeight:900}}>€1,120</p>
                            <p style={{fontSize:22, fontWeight:500}}>/ year</p>
                            </div>}
                        titleColor='#FF6F48'
                        cardTitle='Pro'
                        buttonTitle='Upgrade to Pro'
                        buttonColor='#FF6F48'
                        onClick={() => {window.open("https://share.hsforms.com/1miIElly8QLmQrSYwbVdwYg5ahuz","_parent")}}
                   />
                    <PlanType
                        productNum='200+'
                        details={[
                            {title:'4K+ views, €0.01 / view', checked:true},
                            {title:'3D Visualizer', checked:true},
                            {title:'Augmented reality', checked:true},
                            {title:'Shareable link', checked:true},
                            {title:'Embedded link', checked:true},
                            {title:'Analytics', checked:true},
                            {title:'Custom branding', checked:true},
                            {title:'Email Support', checked:true},
                            {title:'Phone Chat/Support', checked:true},
                            ]}
                        cardTitle='Enterprise'
                        priceColor='#0078FF'
                        priceMonthly={<p style={{fontSize:24, fontWeight:900}}>Contact Us</p>}
                        buttonTitle='Contact Us'
                        buttonColor='#141323'
                        onClick={() => {window.open("https://share.hsforms.com/1FjWz8732Qb-2XFDxm6QOwA5ahuz","_parent")}}
                    />
                </div>
            </div>

            <UpgradeModal
                isOpen={upgradeModalOpen}
                onRequestClose = {() => setUpgradeModalOpen(false)}
                packageName="Starter"
            />


        </div>
    )
}

export default Pricing