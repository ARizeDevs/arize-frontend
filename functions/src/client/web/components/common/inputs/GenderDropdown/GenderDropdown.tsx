import React from 'react'
import Select  from 'react-select';

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
}

const GenderDropdown = (props : IProps) => {
    const { onSelect, selected } = props

    const options = [
        { value: 'Female', label: 'Female' },
        { value: 'Male', label: 'Male' },
        { value: 'Other', label: 'Other' }
    ]
      
    return (
        <div  className={styles.container + ' flex-column'}>
            <p className={styles.label}>Gender</p>
            <Select styles={customStyles} value={selected} onChange={(value) => onSelect(value)} options={options} />
        </div>
    )
}

export default GenderDropdown