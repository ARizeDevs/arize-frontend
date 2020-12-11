import React , { useState, useEffect } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'

import SolidButton from '../../common/buttons/SolidButton'
import Navbar from '../../common/Navbar'
import Input from '../../common/inputs/Input'
import DatePicker from '../../common/inputs/DatePicker'
import GenderDropdown from '../../common/inputs/GenderDropdown'
import CountryPicker from '../../common/inputs/CountryPicker'
import Loading from '../../common/Loading'
import RoundImage from '../../common/RoundImage'

import firebase from '../../../config/firebase'

import styles from './EditProfile.module.css'
import { editUser, getUser } from '../../../API/user'

const EditProfile = () => {
    const router = useRouter()

    const [ imageChanged, setImageChanged ] = useState(false)
    const [ imageSrc, setImageSrc ] = useState(undefined)
    const [ submiting, setSubmiting ] = useState(false)
    const [ generalError, setGeneralError ] = useState(false)
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

    useEffect(() => {
        const getInitData = async () => {
            try {
                firebase.auth().onAuthStateChanged(async function(user) {
                    if(user) {
                        const user = await getUser(false)
                        if(user && user.data.data){
                            const userData = user.data.data.data
                            console.log(userData)
                            setName(userData.name)
                            setSurname(userData.surname)
                            setUsername(userData.username)
                            setBirthday(moment(userData.birthday))
                            const g = userData.gender
                            const gValue = g.charAt(0).toUpperCase() + g.slice(1)
                            setGender({value:gValue,label:gValue})
                            setEmail(userData.email)
                            if(userData.profilePicURL) {
                                firebase.storage().ref(userData.profilePicURL).getDownloadURL().then((url : any) => {
                                    setImageSrc(url)
                                })
                            }
                            setBusinessName(userData.companyName)
                            setBusinessType(userData.companyType)
                            if(userData.bio) setBio(userData.bio)
                            setWhyToUse(userData.whyUseARize)
                            setWebsiteURL(userData.websiteURL)
                            setVatNumber(userData.vatNumber)
                        }
                    }
                })
            } catch(error) {

            }
        }

        getInitData()
    }, [])

    const onEditSubmit = async () => {
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
            setGeneralError(error)
            console.log(error)
        }
    }

    return (
        <div className={styles.root}>
            <Navbar />
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
                    <Input required text='Name' type='text' value={name} onChange={(e:any) => setName(e.target.value)}/>
                    <Input required text='Surname' type='text' value={surname} onChange={(e:any) => setSurname(e.target.value)}/>
                    <Input required text='Username' type='text' value={username} onChange={(e:any) => setUsername(e.target.value)}/>
                    <Input required text='Email' type='text' value={email} onChange={(e:any) => setEmail(e.target.value)}/>
                    <DatePicker value={birthday} onChange={(date:any) => setBirthday(date)} />
                    <GenderDropdown onSelect={setGender} selected={gender} />
                    <CountryPicker value={location} onChange={(val : string) => setLocation(val)} />
                    <div style={{ display:'flex',flexDirection:'row' }}>
                        <Input required text='Business Name' type='text' value={businessName} onChange={(e:any) => setBusinessName(e.target.value)}/>
                        &nbsp;
                        &nbsp;
                        <Input required text='Business Type' type='text' value={businessType} onChange={(e:any) => setBusinessType(e.target.value)}/>
                    </div>
                    <Input required={false} text='Why Do You Want To Use ARize?' type='text' value={whyToUse} onChange={(e:any) => setWhyToUse(e.target.value)}/>
                    <Input required text='Business Website URL' type='text' value={websiteURL} onChange={(e:any) => setWebsiteURL(e.target.value)}/>
                    <Input required text='VAT Number' type='text' value={vatNumber} onChange={(e:any) => setVatNumber(e.target.value)}/>
                </div>
            </div>
            <span className={'error-message'}>{generalError}</span>
            <div className={styles.buttonsContainer}>
                <div className={styles.btn}>
                    <SolidButton colorTheme="#000000" onClick={() => {console.log('save changes')}}  ><h3>Cancel</h3></SolidButton>
                </div>
                &nbsp;
                <div className={styles.btn}>
                    <SolidButton onClick={onEditSubmit}  ><h3>Save Changes</h3></SolidButton>
                </div>
            </div>
            {submiting?<Loading text={'editing your profile ...'} />:null}
        </div>
    )
}

export default EditProfile