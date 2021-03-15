import React from 'react'

import IndividualIcon from '../../../../assets/icons/alldone.svg'

import SolidButton from '../../common/buttons/SolidButton'

import styles from './CompeleteProfile.module.css'

interface IProps {
    onNextClick : () => void,
    error : string
}

const individualText = 'You just successfully created your first Account. Now you can freely explore ARize and share your AR experiences with your friends!'

const CompeleteProfileFinalPage = (props : IProps) => {
    const {  error, onNextClick } = props

    return (
        <div className={styles.accountTypeContainer+ ' flex-column'}>
            <div style={{display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <IndividualIcon />
                <h1 className={styles.accountTypeMessage}>Congratulations!</h1>
            </div>
            <p className={styles.accountTypeMessage} style={{paddingTop:'10%' , textAlign:'center', width:'60%'}} >{individualText}</p>
            <span className={'error-message'}>{error}</span>
        
            <div style={{ width : '100%' , marginBottom : '50%' , display: 'flex',justifyContent : 'center',flexDirection:'row' }}>
                <div className={styles.accountTypeButtonContainer}>
                    <SolidButton onClick={onNextClick} ><h3>Get Started</h3></SolidButton>
                </div>
            </div>
        </div>
    )
}

export default CompeleteProfileFinalPage