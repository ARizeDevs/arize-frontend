import firebase from 'firebase'
import React , { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'


import EmailIcon from '../../../../assets/icons/email3.svg'
import WebsiteIcon from '../../../../assets/icons/website2.svg'

import { getUser } from '../../../API/user'
import SolidButton from '../../common/buttons/SolidButton'

import Navbar from '../../common/Navbar'
import RoundImage from '../../common/RoundImage'

import styles from './Profile.module.css'
import RemainingSlots from '../../common/RemainingSlots'
import ProfileInsights from '../../common/ProfileInsights'
import PostsList from '../../common/PostsList'
import Loading from '../../common/Loading'
import ScrollToTop from '../../common/ScrollToTop'
// import TipBox from '../../common/TipBox'
import { copyToClipBoard } from '../../../helpers/copyToClipBoard'
import { getUserID } from '../../../API/utils'

interface IProps {
    id? : string | null
}

const Profile = (props : IProps) => {
    const { id } = props
    const { addToast } = useToasts()

    const router = useRouter()
    const [ searchText, setSearchText ] = useState('')
    
    const [ imageSrc, setImageSrc ] = useState('')
    const [ name, setName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ surname, setSurname ] = useState('')
    const [ companyName, setCompanyName ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ posts, setPosts ] = useState([])
    const [ websiteURL, setWebsiteURL ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ maxSlots, setMaxSlots ] = useState(20)
    const [ bio, setBio ] = useState('')
    const [ arViews, setARViews ] = useState(0)
    const [ tdViews, setTDViews ] = useState(0)
    const [ clicks, setClicks ] = useState(0)
    const [ totalShares, setTotalShares ] = useState(0)
    const [ fetchingData, setFetchingData] = useState(true)
    const [ showGoToTop, setShowGoToTop ] = useState(false)

    const scrollObject = useRef(null);

    const onScroll = (scrollY : any) => {
        if(scrollY !== 0) {
            setShowGoToTop(true)
        } else {
            setShowGoToTop(false)
        }
    }

    const onGoToTopClick = () => {
        if(scrollObject) {
            if(scrollObject.current) {
                // @ts-ignore
                scrollObject.current.scrollTo({top: 0, behavior: 'smooth'})
            }
        }
    }

    useEffect(() => {
        const getInitData = async () => {
            firebase.auth().onAuthStateChanged(async function(user) {
                try {
                    // if(user) {
                        if(id === null || id) {
                            const user = await getUser(true,id)
                            if(user && user.data.data){
                                const userData = user.data.data
                                setName(userData.name)
                                setUsername(userData.username)
                                setCompanyName(userData.companyName)
                                setSurname(userData.surname)
                                setLocation(userData.location)
                                setWebsiteURL(userData.websiteURL)
                                setEmail(userData.email)
                                if(userData.profilePicURL) {
                                    firebase.storage().ref(userData.profilePicURL).getDownloadURL().then((url : any) => {
                                        setImageSrc(url)
                                    })
                                }
                                if(userData.posts) {
                                    setPosts(userData.posts)
                                    let arViews = 0
                                    let tdViews = 0
                                    let shares = 0
                                    let c = 0
                                    userData.posts.forEach((p : any) => {
                                        if(p.arViews) {
                                            arViews += Object.keys(p.arViews).length
                                        }
                                        if(p.tdViews) {
                                            tdViews += Object.keys(p.tdViews).length
                                        }
                                        if(p.shares) {
                                            shares += Object.keys(p.shares).length
                                        }
                                        if(p.clicks) {
                                            c += Object.keys(p.clicks).length
                                        }
                                    })
                                    setTotalShares(shares)
                                    setARViews(arViews)
                                    setTDViews(tdViews)
                                    setClicks(c)
                                }
                                setMaxSlots(userData.maxSlots)
                                if(userData.bio) setBio(userData.bio)
                            }
                        }
                    // }
                } catch(error) {
                    console.log(error)
                } finally {
                    setFetchingData(false)
                }
            })
        }

        getInitData()
    }, [id])


    const onShareProflie = async () => {
        let userID : any = id
        if(!userID) {
            userID = await getUserID()
        }

        const shareURL = `https://arizear.app/profile/${userID}`

        copyToClipBoard(shareURL)


        addToast('url copied',{ appearance : 'info' })
    }

    return (
        <div className={styles.root}>
            <Navbar imageSrc={imageSrc} />
            {/* @ts-ignore */}
            <div ref={scrollObject} className={styles.bodyContainer} onScroll={(e) => onScroll(e.target.scrollTop)}>
                {showGoToTop?<ScrollToTop onClick={onGoToTopClick} />:null}
                <div className={styles.profileContainer}>
                    <div className={styles.profileSections}>
                        <div className={styles.row}>
                            <div style={{width : "90px" , height:'90px', marginRight:'20px'}}>
                                <RoundImage
                                    imageSrc={imageSrc}
                                    unchangeable
                                />
                            </div>
                            {id === null ?<div className={styles.row}>
                                <div style={{width : '110px',marginRight : '10px'}}>
                                <SolidButton styleClass={styles.editProfileBTN} colorTheme='white' onClick={() => router.push('/edit-profile')} ><h4 style={{color : 'black'}}>Edit Profile</h4></SolidButton>
                                </div>
                                <div className={styles.shareProfile} style={{width : '110px'}}>
                                    <SolidButton styleClass={styles.shareProfileBTN} colorTheme='white' 
                                        onClick={onShareProflie} 
                                    >
                                        <h4 style={{color : 'var(--main-blue-color)'}}>Share Profile</h4>
                                    </SolidButton>
                                </div>
                            </div>:null}
                        </div>
                        <br></br>
                        <br></br>
                        <h1 className={styles.name}>{companyName?companyName:`${name} ${surname}`}</h1>
                        <p className={styles.lightColor}>{id?location:username}</p>
                        <br></br>
                        {id !== null ? <h4 style={{color : 'var(--main-blue-color)'}}>{posts.length} posts</h4> : null}
                        <br></br>
                        <div style={{width:'70%'}}>
                            <p>{bio}</p>
                        </div>
                        <br></br>
                    </div>
                    <div className={`${styles.profileSections} ${styles.statisticsSection}`}>
                        
                        {id === null ? 
                            <>
                                <div className={styles.shadowedBox}>
                                    <RemainingSlots maxSlots={maxSlots} usedSlots={posts.length} />
                                    <br></br>
                                    <SolidButton colorTheme={'black'} onClick={() => router.push('/pricing')}  ><h3>Upgrade</h3></SolidButton>
                                </div>
                                <br></br>
                                <div className={styles.shadowedBox}>
                                    <ProfileInsights 
                                        arViews={arViews}
                                        shares={totalShares}
                                        tdViews={tdViews}
                                        clicks={clicks}
                                    />
                                </div>
                            </>
                        :   <div className={styles.row}>
                                <div style={{width : '180px',marginRight : '10px'}}>
                                    <SolidButton styleClass={styles.editProfileBTN} colorTheme='white' onClick={() => {websiteURL?router.push(websiteURL):''}} >
                                        <div className={styles.row} style={{justifyContent:'center'}}>
                                            <WebsiteIcon />
                                            <h4 style={{color : 'black',marginLeft:'10px'}}>Visit Website</h4>
                                        </div>
                                    </SolidButton>
                                </div>
                                <div className={styles.shareProfile} style={{width : '110px'}}>
                                    <SolidButton styleClass={styles.shareProfileBTN} colorTheme='white' 
                                        onClick={() => {email?router.push(`mailto:${email}?subject = Feedback&body = Message`):''}} 
                                    >
                                        <div className={styles.row} style={{justifyContent:'center'}}>
                                            <EmailIcon />
                                            <h4 style={{color : 'var(--main-blue-color)',marginLeft:'10px'}}>Email</h4>
                                        </div>
                                    </SolidButton>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <br></br>
                <div className={styles.profilePostsContainer}>
                    {id === null ?
                    <>
                        <div className={styles.rowContainer} style={{width:'100%'}}>
                            <div className={styles.rowContainer} style={{justifyContent:'flex-start'}}>
                                <p className={styles.lightColor}>My Posts ( {posts.length} posts )</p>
                            </div>

                            {/* {posts.length !== 0 ?<div style={{width:'140px'}}>
                                <SolidButton onClick={() => router.push('/arstudio')} ><h3>Create AR</h3></SolidButton>
                            </div>:null} */}
                        </div>  
                        <div className={styles.verticalDivider}></div>
                    </>
                    : null}
                    <PostsList list={posts} searchText={searchText} setSearchText={setSearchText} />
                </div>
                </div>
            {fetchingData?<Loading text='Loading ...' />:null}
        </div>
    )
}

export default Profile