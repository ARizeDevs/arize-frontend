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
                <p className={styles.accountTypeMessage} style={{paddingTop:'5%',textAlign:'center', width:'50%'}} >{individualText}</p>
                <div className={styles.accountTypeButtonContainer} style={{paddingTop:'5%', width:'20%'}} >
                <SolidButton onClick={onNextClick} ><h3>Get Started</h3></SolidButton>
                </div>
            </div>
            <span className={'error-message'}>{error}</span>
        </div>
    )
}

export default CompeleteProfileFinalPage