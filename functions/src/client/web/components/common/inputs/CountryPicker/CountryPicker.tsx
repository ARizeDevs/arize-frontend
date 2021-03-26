import React, { useState } from 'react'
// @ts-ignore
import ReactCountryFlag  from "react-country-flag"
import { getCode } from 'country-list';

import CountryPickerModal from '../CountryPickerModal'

import styles from './CountryPicker.module.css'
import Message from '../../Message';
import { IMessageTypes } from '../../Message/Message';

interface IProps {
    value : string,
    onChange : (val : string) => void,
    error? : string
}

const CountryPicker = (props : IProps) => {
    const { value, onChange, error } = props
    const [ modalOpen, setModalOpen ] = useState(false)
    const [ active, setActive ] = useState(false)
    const code : string | undefined  = getCode(value)
    
    const onModalClose = (countryName : string) => {
        setModalOpen(false)
        onChange(countryName)
    }
    const onFocus = () => setActive(true)
    const onBlur = () => setActive(false)

    return (
        <div  className={styles.container + ' flex-column'}>
            <p className={`${styles.label} ${error?styles.error:''}`}>Your business location</p>
            <div onClick={() => setModalOpen(true)} onFocus={onFocus} onBlur={onBlur} className={`${styles.secondContainer} flex-row ${error?styles.secondContainerError:(active?styles.secondContainerActive:'')}`}>
                <div  className={styles.icon}>
                    {code ?<ReactCountryFlag 
                        countryCode={code}
                        aria-label="United States"
                        svg
                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                        cdnSuffix="svg"
                        title="US"
                    />:null}
                </div>

                <div className={styles.countryPicker + ' flex-column'}  ><p>{value}</p></div>
            </div>
            {error?<Message text={error} type={IMessageTypes.ERROR} />:null}
            {modalOpen?<CountryPickerModal onClose={onModalClose} />:null}
        </div>
    )
}

export default CountryPicker