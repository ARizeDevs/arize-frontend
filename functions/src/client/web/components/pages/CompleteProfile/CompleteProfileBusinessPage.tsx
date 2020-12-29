import React from 'react'

import Input from '../../common/inputs/Input'
import SolidButton from '../../common/buttons/SolidButton'

import styles from './CompeleteProfile.module.css'
import Message from '../../common/Message'
import { IMessageTypes } from '../../common/Message/Message'

interface IProps {
    onNextClick : () => void,
    onSkipClick : () => void,
    businessName : string,
    businessType : string,
    error : string,
    whyToUse : string,
    websiteURL : string,
    vatNumber : string,
    setVATNumber : (vatNumber : string ) => void,
    setBusinessName : (businessName : string) => void,
    setBusinessType : (businessType : string) => void,
    setWhyToUse : (whyToUse : string) => void,
    setWebsiteURL : (websiteURL : string) => void,
}

const CompleteProfileBusinessPage = (props : IProps) => {
    const { error, onNextClick, businessName, onSkipClick, vatNumber, setVATNumber, businessType, whyToUse, websiteURL, setBusinessName, setBusinessType, setWhyToUse, setWebsiteURL } = props

    return (
        <div className={styles.fieldsContainer + ' flex-column'}>
            <div >
                <div style={{ display:'flex',flexDirection:'row' }}>
                    <Input placeholder='Business name' required text='Business Name' type='text' value={businessName} onChange={(e:any) => setBusinessName(e.target.value)}/>
                    &nbsp;
                    &nbsp;
                    <Input placeholder='Business type' required text='Business Type' type='text' value={businessType} onChange={(e:any) => setBusinessType(e.target.value)}/>
                </div>
                <Input placeholder='Describe a little bit...' required={false} text='Why Do You Want To Use ARize?' type='text' value={whyToUse} onChange={(e:any) => setWhyToUse(e.target.value)}/>
                <Input placeholder='htpps://example.com' required text='Business Website URL' type='text' value={websiteURL} onChange={(e:any) => setWebsiteURL(e.target.value)}/>
                <Input placeholder='...' required text='VAT Number' type='text' value={vatNumber} onChange={(e:any) => setVATNumber(e.target.value)}/>
            </div>
            <span className={'error-message'}>{error}</span>

            <div style={{ width : '100%' , marginBottom : '80px' , display: 'flex',justifyContent : 'space-between',flexDirection:'row',alignItems:'center' }}>
                <div className={styles.accountTypeButtonContainer}>
                    <SolidButton styleClass={styles.borderedBTN} colorTheme='white' onClick={() => onSkipClick()} ><h3 style={{ color : 'var(--main-blue-color)'}} >Skip</h3></SolidButton>
                </div>
                <Message 
                    text='You can always comeback and fill these information'
                    type={IMessageTypes.INFO}
                />
                <div className={styles.accountTypeButtonContainer}>
                    <SolidButton onClick={() => onNextClick()} ><h3>Next</h3></SolidButton>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfileBusinessPage