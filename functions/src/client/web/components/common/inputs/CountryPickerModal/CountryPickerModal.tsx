import React, { useState } from 'react'
import ReactCountryFlag  from "react-country-flag"
import { getCode } from 'country-list';

import SolidButton from '../../buttons/SolidButton'
import Input from '../../inputs/Input'

import SearchInputIcon from '../../../../../assets/icons/search-input.svg'

import styles from './CountryPickerModal.module.css'

interface IProps {
    onClose : (countryName : string) => void,
}

const countryList = require('./countries.json');

const CountryPickerModal = (props : IProps) => {
    const { onClose } = props
    const [ country, setCountry ] = useState('')
    const [ search, setSearch ] = useState('')

    const rendredCountryList = countryList.filter((item : string) => {
        return item.toLowerCase().includes(search.toLowerCase())
    }).map((item : string) => {
        const code : string | undefined  = getCode(item)

        return (
            <React.Fragment key={item}>
                <div onClick={() => setCountry(item)}  style={{backgroundColor:(item === country?'rgba(0,0,0,.1)':'white')}} className={styles.countryItem +  ' flex-row'} >
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
                    <p>{item}</p>
                </div>
                <div className={styles.divider}></div>
            </React.Fragment>

        )
    })

    return (
        <div className={styles.root}>
            <div className={styles.searchInputContainer}>
                <Input removeBorder LeftIcon={SearchInputIcon} required={false} text='' type='text' value={search} onChange={(e : any) => {setSearch(e.target.value)}} placeholder='search' />
            </div>
            <div className={styles.countryList}>
                {rendredCountryList}
            </div>
            <div className={styles.buttonContainer}>
                <SolidButton onClick={() => onClose(country)} ><h3>Done</h3></SolidButton>
            </div>
        </div>
    )
}

export default CountryPickerModal