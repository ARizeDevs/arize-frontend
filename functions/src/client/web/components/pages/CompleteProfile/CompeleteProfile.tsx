import React , { useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

import Navbar from '../../common/Navbar'
import Loading from '../../common/Loading'
import CompeleteProfilePersonalInfoPage from './CompeleteProfilePersonalInfoPage'
import CompleteProfileBusinessPage from './CompleteProfileBusinessPage'
import CompeleteProfileFinalPage from './CompeleteProfileFinalPage'

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

    const validatePersonalData = () => {
        if(!name || name === '') return 'please fill all required fields'
        if(!surname || surname === '') return 'please fill all required fields'
        if(!username || username === '') return 'please fill all required fields'
        if(!birthday) return 'please fill all required fields'
        if(!gender ) return 'please fill all required fields'
        if(!location || location === '') return 'please fill all required fields'
        return null
    }

    const validateBusinessData = () => {
        if(!businessName || businessName === '') return 'please fill all required fields'
        if(!businessType || businessType === '') return 'please fill all required fields'
        if(!websiteURL || websiteURL === '') return 'please fill all required fields'
        return null
    }

    const stepsData = [
        {
            title:'Some Personal Info',
            description:'Please Let us Know you!',
            
            renderContent: () => <CompeleteProfilePersonalInfoPage
                error={generalError} 
                onNextClick={(accountData : any) => {
                    const error = validatePersonalData()
                    if(error) {
                        setGeneralError(error)
                    }else {
                        setStep(step+1)
                        setGeneralError('')
                    }}}
                name={name}
                bio={bio}
                setBio={setBio}
                setName={setName}
                surname={surname}
                setSurname={setSurname}
                username={username}
                setUsername={setUsername}
                birthday={birthday}
                setBirthday={setBirthday}
                gender={gender}
                setGender={setGender}
                location={location}
                setLocation={setLocation}
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
                    const error = validateBusinessData()
                    if(error) {
                        setGeneralError(error)
                    } else {
                        setStep(step+1)
                        setGeneralError('')
                    }
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