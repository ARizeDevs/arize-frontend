import React from 'react'

import CountryPicker from '../../common/inputs/CountryPicker'
import GenderDropdown from '../../common/inputs/GenderDropdown'
import DatePicker from '../../common/inputs/DatePicker'
import Input from '../../common/inputs/Input'
import SolidButton from '../../common/buttons/SolidButton'

import styles from './CompeleteProfile.module.css'
import MultiLineInput from '../../common/inputs/MultiLineInput'

interface IProps {
    onNextClick : (accountData : any) => void,
    name : string,
    surname: string,
    username: string,
    birthday: any,
    gender: {value:string,label:string},
    location: string,
    bio : string,
    setBio : (bio:string) => void,
    setName:(name:string) => void,
    setSurname:(surename:string) => void,
    setUsername:(username:string) => void,
    setBirthday:(birthday:any) => void,
    setGender:(gender:{value:string,label:string}) => void,
    setLocation:(location:string) => void,
    error : string
}

const CompeleteProfilePersonalInfoPage = ( props : IProps ) => {
    const {
        error,
        onNextClick, 
        name, 
        surname, 
        username, 
        birthday, 
        gender, 
        location, 
        setName, 
        setSurname, 
        setUsername, 
        setBirthday,
        setGender,
        setLocation,
        bio,
        setBio,

    } = props

    return (
        <div className={styles.fieldsContainer + ' flex-column'}>
            <div >
                <div style={{ display:'flex',flexDirection:'row' }}>
                    <Input required text='Name' type='text' value={name} onChange={(e:any) => setName(e.target.value)}/>
                    &nbsp;
                    &nbsp;
                    <Input required text='Surname' type='text' value={surname} onChange={(e:any) => setSurname(e.target.value)}/>
                </div>
                <Input required text='Username' type='text' value={username} onChange={(e:any) => setUsername(e.target.value)}/>
                <MultiLineInput required={false} text='Bio' onChange={(e : any) => setBio(e.target.value)} value={bio}/>
                <div style={{ display:'flex',flexDirection:'row' }}>
                    <DatePicker value={birthday} onChange={(date:any) => setBirthday(date)} />
                    &nbsp;
                    &nbsp;
                    <GenderDropdown onSelect={setGender} selected />
                </div>
                <CountryPicker value={location} onChange={(val : string) => setLocation(val)} />
            </div>
            <span className={'error-message'}>{error}</span>
            
            <div style={{ width : '100%' , display: 'flex',justifyContent : 'flex-end',flexDirection:'row' }}>
                <div className={styles.accountTypeButtonContainer}>
                    <SolidButton onClick={() => onNextClick({name,surname,username,birthday,gender,location})} ><h3>Next</h3></SolidButton>
                </div>
            </div>
        </div>
    )
}

export default CompeleteProfilePersonalInfoPage