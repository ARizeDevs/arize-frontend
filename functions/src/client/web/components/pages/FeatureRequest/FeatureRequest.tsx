import React , { useState, useEffect } from 'react'
import Navbar from '../../common/Navbar'
import SolidButton from '../../common/buttons/SolidButton'
import Input from '../../common/inputs/Input'
import MultiLineInput from '../../common/inputs/MultiLineInput'
import {useRouter}  from 'next/router'
import styles from './FeatureRequest.module.css'
import FeatureRequestBanner from '../../../../assets/banners/toTheStars.svg'
import {getUserEmail} from  '../../../API/utils'
import {createTicket} from  '../../../API/support'
import Loading from '../../common/Loading'
import { useToasts } from 'react-toast-notifications'
import firebase from 'firebase'
import { getUser } from '../../../API/user'



const FeatureRequest = () => {
    const router  = useRouter()
    const [ submiting, setSubmiting] = useState(false)
    const [email,setEmail] = useState<string>()
    const [input,setInput] = useState<string>()
    const [multiline,setMultiLine] = useState<string>()
    const { addToast } = useToasts()
    const [ error, setError ] = useState('')
    const [ imageSrc, setImageSrc ] = useState('')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function(user) {
            try {
                if(user) {
                    const user = await getUser( null)
                    if(user && user.data.data){
                        const userData = user.data.data
                        if(userData.profilePicURL) {
                            firebase.storage().ref(userData.profilePicURL).getDownloadURL().then((url : any) => {
                                setImageSrc(url)
                            })
                        }
                    }
                }
            } catch (error) {

            }
        })
    })
   

    useEffect(() => {
        // firebase.auth().onAuthStateChanged(async (user) => setEmail(user.email))
        (async () =>  setEmail(await getUserEmail()))()
    },[])

    function onInput(v: string):void{
        setInput(v)
    }

    function onMultiLine(v: string): void{
        setMultiLine(v)
    }
   
    async function onSubmit() {
        setSubmiting(true)
        try{
           await createTicket(input,multiline,"FEATURE_REQUEST")
           

        }catch(error){
            setError('something went wrong')
        }finally {
            setSubmiting(false)
            addToast('Submit Succesful',{ appearance : 'info' })
            setTimeout(() => {
                router.push('/profile')
            } , 1000)
        }

    }

    

    return (
        <div className={styles.root}>
            <Navbar imageSrc={imageSrc} />
            <div className={styles.bodyContainer}>
                <div className={styles.rowContainer}>
                        <div className={styles.column} >
                            <div>
                            <h2>What feature do you need?</h2>
                            <br></br>
                            <p>Describe the feature and provide as much details as you can.</p>
                            <br></br>
                        </div>
                        <div className={styles.column2} style={{width:'100%'}}>
                            <Input onChange={onInput} placeholder='e.g. upload size , file format, etc.' required={true} maxInputLength={30} text='Subject' type='text'/>
                            <MultiLineInput style={{height: 225}} onChange={onMultiLine} placeholder='provide as much details as you can' maxInputLength={200} required={true} text='Description'  />
                            <SolidButton onClick={onSubmit} ><h3>Submit</h3></SolidButton>
                        </div>
                    </div>
                    <div className={styles.banner}>
                        <FeatureRequestBanner/>
                    </div>
                    </div>
            </div>
            {submiting ? <Loading text='Submiting ...' />:null}
        </div>
    )
}

export default FeatureRequest