import React from 'react'

import SolidButton from '../../common/buttons/SolidButton'

import IndividualActiveCard from '../../../../assets/icons/individual-active-card.svg'
import IndividualDeactiveCard from '../../../../assets/icons/individual-deactive-card.svg'
import BusinessActiveCard from '../../../../assets/icons/business-active-card.svg'
import BusinessDactiveCard from '../../../../assets/icons/business-deactive-card.svg'

import styles from './CompeleteProfile.module.css'

const individualText = 'With an ARize "Business" account you do more stuff such as creating and sharing product based AR, customize your profile, add "CTA" button, and so many more things...'
const businessText = 'With an ARize "Individual" account you can easily create, view, and share Augmented Reality experiences'

interface IProps {
    onNextClick: () => void,
    individual: boolean,
    onChange: (indiviual : boolean) => void
}

const CompeleteProfileAccountTypePage = (props : IProps) => {
    const { onNextClick, onChange, individual } = props

    return (
        <div className={styles.accountTypeContainer+ ' flex-column'}>
            <div className={styles.accountTypeItemsContainer + ' flex-row'}>
                <div onClick={() => onChange(false)} className={styles.accoutnTypeCard}> {!individual ?<BusinessActiveCard /> : <BusinessDactiveCard />}</div>
                <div onClick={() => onChange(true)} className={styles.accoutnTypeCard}> {individual ? <IndividualActiveCard /> : <IndividualDeactiveCard />}</div>
            </div>
            <div className={styles.accountTypeMessageContainer}>
                <p className={styles.accountTypeMessage}>{individual ? individualText : businessText}</p>
            </div>
            <div style={{ width : '100%' , marginBottom : '40px' , display: 'flex',justifyContent : 'flex-end',flexDirection:'row' }}>
                <div className={styles.accountTypeButtonContainer}>
                    <SolidButton  onClick={() => onNextClick()} ><h3>Next</h3></SolidButton>
                </div>
            </div>
        </div>
    )
}

export default CompeleteProfileAccountTypePage