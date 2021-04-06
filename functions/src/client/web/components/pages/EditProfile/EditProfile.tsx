import React , { useState, useEffect } from 'react'
// import moment from 'moment'
import { useRouter } from 'next/router'

import SolidButton from '../../common/buttons/SolidButton'
import Navbar from '../../common/Navbar'
import Input from '../../common/inputs/Input'
import DatePicker from '../../common/inputs/DatePicker'
import GenderDropdown from '../../common/inputs/GenderDropdown'
import CountryPicker from '../../common/inputs/CountryPicker'
import Loading from '../../common/Loading'
import RoundImage from '../../common/RoundImage'
import { birthdayValidator, editProfileValidator, genderValidator, 
    locationValidator, nameValidator, surnameValidator, usernameValidator, } from './validators'

import PenIcon from '../../../../assets/icons/pen.svg'

import firebase, { getDirectURL } from '../../../config/firebase'

import styles from './EditProfile.module.css'
import { editUser, getUser } from '../../../API/user'
import MultiLineInput from '../../common/inputs/MultiLineInput'
import moment from 'moment'

const EditProfile = () => {
    const router = useRouter()

    const [ imageChanged, setImageChanged ] = useState(false)
    const [ imageSrc, setImageSrc ] = useState(undefined)
    const [ submiting, setSubmiting ] = useState(false)
    const [ fetchingData, setFetchingData ] = useState(true)
    // const [ generalError, setGeneralError ] = useState(false)
    const [ name, setName ] = useState('')
    const [ surname, setSurname ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ bio, setBio ] = useState('')
    const [ birthday, setBirthday ] = useState(moment())
    const [ gender, setGender ] = useState({value:'Male',label:'Male'})
    const [ location, setLocation ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ businessName, setBusinessName ] = useState('')
    const [ businessType, setBusinessType ] = useState('')
    const [ whyToUse, setWhyToUse ] = useState('')
    const [ websiteURL, setWebsiteURL ] = useState('')
    const [ vatNumber, setVatNumber ] = useState('')
    const [ error, setError ] = useState({} as {[key : string] : string})
    const [ maxSlots, setMaxSlots] = useState(3);
    const [ postCount, setPostCount] = useState(0);

    const validateAndSet = (fn : (arg : any) => void, validate : (arg : any) => any) => {
        return (value : any) => {
            fn(value)
            const result = validate(value)
            setError({...error,...result})
        }
    }

    useEffect(() => {
        const getInitData = async () => {
            firebase.auth().onAuthStateChanged(async function(user) {
                try {
                    if(user) {
                        const user = await getUser(null)
                        if(user && user.data.data){
                            const userData = user.data.data
                            setName(userData.name)
                            setLocation(userData.location);
                            setSurname(userData.surname)
                            setUsername(userData.username)
                            setBirthday(moment(userData.birthday))
                            const g = userData.gender
                            const gValue = g.charAt(0).toUpperCase() + g.toLowerCase().slice(1)
                            setGender({value:gValue,label:gValue})
                            setEmail(userData.email)
                            if(userData.profilePicURL) {
                                getDirectURL(userData.profilePicURL).then((url : any) => {
                                    setImageSrc(url)
                                })
                            }
                            setBusinessName(userData.companyName)
                            setBusinessType('Type')
                            if(userData.bio) setBio(userData.bio)
                            setWhyToUse(userData.whyUseARize)
                            setWebsiteURL(userData.websiteURL)
                            setVatNumber(userData.vatNumber)
                            setPostCount(userData.postsCount);
                            setMaxSlots(userData.maxSlots);
                        }
                    }
                } catch(error) {
    
                } finally {
                    setFetchingData(false)
                }
            })
        }

        getInitData()
    }, [])

    const onEditSubmit = async () => {
        
        const errorResult = editProfileValidator(
            name,
            surname,
            username,
            birthday,
            location,
            gender
        )

        setError(errorResult)
        
        let anyError = false
        Object.values(errorResult).forEach((value) => {
            if(value) anyError = true
        })
        
        
        if(anyError) return
        
        setSubmiting(true)

        let updatedFields = {
            name,
            surname,
            bio,
            username,
            birthday,
            gender : gender.value.toUpperCase(),
            location,
            companyName :businessName,
            companyType :businessType,
            whyUseARize :whyToUse,
            websiteURL :websiteURL,
            vatNumber
        }

        try {

            let base64Image = null
            if(imageChanged) {
                base64Image = imageSrc
            }

            const result = await editUser(updatedFields,base64Image as any)

            
            if (result.status === 200 || result.status === 201) {
                setSubmiting(false)
                router.push('/profile')
            }
        } catch(error) {
            setSubmiting(false)
            // setGeneralError(error)
            console.log(error)
        }
    }

    return (
        <div className={styles.root}>
            <Navbar imageSrc={imageSrc} haveMoreSlots={maxSlots - postCount > 0}/>
            <div className={styles.bodyContainer}>
                <div style={{ width:'90%' }}>
                    <div style={{width : "90px" , height:'90px'}}>
                        <RoundImage
                            imageSrc={imageSrc}
                            size='90px'
                            onImageChanged={(newImage : string) => {
                                setImageChanged(true)
                                setImageSrc(newImage as any)
                            }}
                        />
                    </div>
                    <br></br>
                    <br></br>
                    <Input placeholder='name...' error={error.name} maxInputLength={30} required text='Name' type='text' value={name} onChange={validateAndSet(setName,nameValidator)}/>
                    <Input placeholder='surname...' error={error.surname} maxInputLength={30} required text='Surname' type='text' value={surname} onChange={validateAndSet(setSurname,surnameValidator)}/>
                    <Input placeholder='username...' error={error.username} maxInputLength={30}  required text='Username' type='text' value={username} onChange={validateAndSet(setUsername, usernameValidator)}/>
                    <MultiLineInput placeholder='Please write a few sentences to describe your business so when sharing your ARize profile it will be seen by others' maxInputLength={200} required={false} text='Your company bio' value={bio} onChange={setBio}  />
                    <Input placeholder='example@mail.com' disabled required text='Email' type='text' value={email} onChange={setEmail}  RightIcon={PenIcon} onRightIconClick={() => router.push('/change-email')}/>
                    <Input placeholder='************' disabled required text='Password' type='password' value={'123456789'} onChange={() => ''} RightIcon={PenIcon} onRightIconClick={() => router.push('/forget-password')}/>
                    <DatePicker error={error.birthday} value={birthday} onChange={validateAndSet(setBirthday,birthdayValidator)} />
                    {/* <Input placeholder='dd/mm/yyyy' error={error.birthday} maxInputLength={30} required text='Date of birth' type='date' value={birthday} onChange={validateAndSet(setBirthday,birthdayValidator)}/> */}
                    <GenderDropdown error={error.gender} onSelect={validateAndSet(setGender, genderValidator)} selected={gender} />
                    <CountryPicker error={error.location} value={location} onChange={validateAndSet(setLocation, locationValidator)} />
                    <div style={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
                        <Input placeholder='Business name' required text='Business Name' type='text' value={businessName} onChange={setBusinessName}/>
                    </div>
                    {/* <Input placeholder='Type here... ' required={false} text='Why do you want to use ARize?' type='text' value={whyToUse} onChange={setWhyToUse}/> */}
                    <Input placeholder='https://example.com' required text='Business website URL' type='text' value={websiteURL} onChange={setWebsiteURL}/>
                    <Input placeholder='...' required text='VAT Number' type='text' value={vatNumber} onChange={setVatNumber}/>
                </div>
            </div>
            {/* <span className={'error-message'}>{generalError}</span> */}
            <div className={styles.buttonsContainer}>
                <div className={styles.btn} style={{width:'100px'}}>
                    <SolidButton colorTheme="#000000" onClick={() => router.push("/profile")}  ><h3>Cancel</h3></SolidButton>
                </div>
                &nbsp;
                <div className={styles.btn} style={{width:'160px'}}>
                    <SolidButton onClick={onEditSubmit}  ><h3>Save Changes</h3></SolidButton>
                </div>
            </div>
            {fetchingData?<Loading text='Loading ...' />:null}
            {submiting?<Loading text={'editing your profile ...'} />:null}
        </div>
    )
}

export default EditProfile