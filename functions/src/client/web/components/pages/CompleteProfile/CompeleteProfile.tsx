import React , { useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

import Navbar from '../../common/Navbar'
import Loading from '../../common/Loading'
import CompeleteProfilePersonalInfoPage from './CompeleteProfilePersonalInfoPage'
import CompleteProfileBusinessPage from './CompleteProfileBusinessPage'
import CompeleteProfileFinalPage from './CompeleteProfileFinalPage'
import { birthdayValidator, personalInfoValidator, genderValidator, locationValidator, nameValidator, surnameValidator, usernameValidator, } from './validators'

import styles from './CompeleteProfile.module.css'
import MultiPageFormNavbar from '../../common/MultiPageFormNavbar'
import { editUser } from '../../../API/user'

const CompleteProfile = () => {
    const router = useRouter()

    const [ submiting, setSubmiting ] = useState(false)
    const [ step, setStep ] = useState(0)
    const [ generalError, setGeneralError ] = useState('')
    const [ name, setName ] = useState('')
    const [ surname, setSurname ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ birthday, setBirthday ] = useState(moment())
    const [ gender, setGender ] = useState({value:'Male',label:'Male'})
    const [ location, setLocation ] = useState('')
    const [ businessName, setBusinessName ] = useState('')
    const [ businessType, setBusinessType ] = useState('')
    const [ whyToUse, setWhyToUse ] = useState('')
    const [ bio, setBio ] = useState('')
    const [ websiteURL, setWebsiteURL ] = useState('')
    const [ vatNumber, setVatNumber ] = useState('')
    const [ error, setError ] = useState({} as {[key : string] : string})

    const validateAndSet = (fn : (arg : any) => void, validate : (arg : any) => any) => {
        return (value : any) => {
            fn(value)
            const result = validate(value)
            setError({...error,...result})
        }
    }

    const onEditFinish = async () => {
        if(submiting) return
        try{
            setSubmiting(true)
            let updatedFields = {
                name,
                surname,
                bio,
                username,
                birthday : birthday.toISOString(),
                gender : gender.value.toUpperCase(),
                location,
                companyName :businessName,
                companyType :businessType,
                whyUseARize :whyToUse,
                websiteURL :websiteURL,
                vatNumber
            }

            
            const result = await editUser(updatedFields)
    
                
            if (result.status === 200 || result.status === 201) {
                setSubmiting(false)
                router.push('/')
            }
        } catch(error) {
            setSubmiting(false)
            setGeneralError(error)
            console.log(error)
        }
    }

    const stepsData = [
        {
            title:'Some Personal Info',
            description:'Please Let us Know you!',
            
            renderContent: () => <CompeleteProfilePersonalInfoPage
                error={error} 
                onNextClick={(accountData : any) => {
                    const errorResult = personalInfoValidator(
                        name,
                        surname,
                        username,
                        birthday,
                        location,
                        gender,
                    )
            
                    setError(errorResult)
                    
                    let anyError = false
                    Object.values(errorResult).forEach((value) => {
                        if(value) anyError = true
                    })
                    if(anyError) return

                   
                    setStep(step+1)
                }}
                name={name}
                bio={bio}
                setBio={setBio}
                setName={validateAndSet(setName,nameValidator)}
                surname={surname}
                setSurname={validateAndSet(setSurname,surnameValidator)}
                username={username}
                setUsername={validateAndSet(setUsername,usernameValidator)}
                birthday={birthday}
                setBirthday={validateAndSet(setBirthday,birthdayValidator)}
                gender={gender}
                setGender={validateAndSet(setGender,genderValidator)}
                location={location}
                setLocation={validateAndSet(setLocation,locationValidator)}
            />
        },
        {
            title:'Final One',
            description:'Please tell us about your business',
            renderContent: () => <CompleteProfileBusinessPage
            onSkipClick={() => {
                    setBusinessType('')
                    setBusinessName('')
                    setWhyToUse('')
                    setWebsiteURL('')
                    setVatNumber('')
                    setStep(step+1)
                }}
                onNextClick={() => {
                    setStep(step+1)
                }}
                vatNumber={vatNumber}
                setVATNumber={setVatNumber}
                businessName={businessName}
                setBusinessName={setBusinessName}
                businessType={businessType}
                setBusinessType={setBusinessType}
                whyToUse={whyToUse}
                setWhyToUse={setWhyToUse}
                websiteURL={websiteURL}
                setWebsiteURL={setWebsiteURL}
                error={generalError} 
                />
        },
        {
            title:'Final One',
            description:'You are almost there!',
            renderContent: () => <CompeleteProfileFinalPage
                error={generalError}
                onNextClick={onEditFinish}/>
        },
    ]

    return (
        <div className={styles.root}>
            <Navbar />
            <div className={styles.bodyContainer}>
                <MultiPageFormNavbar  
                    activeIndex={step} 
                    onClick={(stepNumber:number) => (stepNumber < step? setStep(stepNumber):null)}  
                    items={[{name : 'Personal Info' , title : "Some Personal Info" , description : 'Please let us know you a little bit more!'},
                            {name:'Company Info (optional)', title : "Are you a company?" , description : 'Please let us know you a little bit more!'},
                            {name:'Final', title : "Some Personal Info" , description : 'Please let us know you a little bit more!'}
                            ]}
                    />
                <div className={styles.pageContainer + ' flex-column'}>
                    {stepsData[step].renderContent()}
                </div>
            </div>
            {submiting ? <Loading text='Updating your profile..' /> : null}
        </div>
    )
}

export default CompleteProfile