import React from 'react'

import IndividualIcon from '../../../../assets/icons/individual.svg'

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
            <p className={styles.accountTypeMessage}>{individualText}</p>
            <span className={'error-message'}>{error}</span>

            <div style={{ width : '100%' , marginBottom : '40px' , display: 'flex',justifyContent : 'flex-end',flexDirection:'row' }}>
                <div className={styles.accountTypeButtonContainer}>
                    <SolidButton onClick={onNextClick} ><h3>Explore Now</h3></SolidButton>
                </div>
            </div>
        </div>
    )
}

export default CompeleteProfileFinalPage