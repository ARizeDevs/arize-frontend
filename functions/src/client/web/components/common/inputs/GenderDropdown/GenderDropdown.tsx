import React from 'react'
import Select  from 'react-select';
import Message from '../../Message';
import { IMessageTypes } from '../../Message/Message';

import styles from './GenderDropdown.module.css'

const customStyles = {
    container  : (provided : any, state : any) => ({
        ...provided,
        height : '50px',
        borderRadius:'20px'
      }),
    control : (provided : any, state : any) => ({
        ...provided,
        height : '50px',
        borderRadius:'20px',
        backgroundColor : 'var(--main-lightgray-color)',
        border:'1px solid black'
      }),
}

interface IProps {
    selected : any,
    onSelect : (arg:any) => void,
    error? : string
}

const GenderDropdown = (props : IProps) => {
    const { onSelect, selected, error } = props

    const options = [
        { value: 'Female', label: 'Female' },
        { value: 'Male', label: 'Male' },
        { value: 'Other', label: 'Other' }
    ]
      
    console.log('10329031204821')
    console.log(error);
    console.log(selected)
    
    return (
        <div  className={styles.container + ' flex-column'}>
            <p className={`${styles.label} ${error?styles.error:''}`}>Gender</p>
            <Select styles={customStyles} value={selected} onChange={(value) => onSelect(value)} options={options} />
            {error?<Message text={error} type={IMessageTypes.ERROR} />:null}
        </div>
    )
}

export default GenderDropdown