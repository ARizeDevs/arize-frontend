import firebase from 'firebase'
import React , { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'

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
    const [ location, setLocation ] = useState('')
    const [ posts, setPosts ] = useState([])
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
                    if(user) {
                        if(id === null || id) {
                            console.log('00000000000000000')
                            console.log(id)
                            const user = await getUser(true,id)
                            console.log(user)
                            console.log(user.data.data)
                            if(user && user.data.data){
                                console.log('fucking here')
                                const userData = user.data.data
                                setName(userData.name)
                                setUsername(userData.username)
                                setSurname(userData.surname)
                                setLocation(userData.location)
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
                                            arViews += p.arViews.length
                                        }
                                        if(p.tdViews) {
                                            tdViews += p.tdViews.length
                                        }
                                        if(p.shares) {
                                            shares += p.shares.length
                                        }
                                        if(p.clicks) {
                                            c += p.clicks.length
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
                    }
                } catch(error) {
                    console.log(error)
                } finally {
                    setFetchingData(false)
                }
            })
        }

        getInitData()
    }, [id])


    const onShareProflie = () => {
        let userID = id
        if(!userID) {
            userID = getUserID()
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
                <div style={{width:'70%',marginLeft:'auto',marginRight:'auto'}}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileSections}>
                        <div className={styles.row}>
                            <div style={{width : "90px" , height:'90px', marginRight:'20px'}}>
                                <RoundImage
                                    imageSrc={imageSrc}
                                    unchangeable
                                />
                            </div>
                            <div className={styles.row}>
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
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <h1 className={styles.name}>{`${name} ${surname}`}</h1>
                        <p className={styles.lightColor}>{id?location:username}</p>
                        <br></br>
                        <div style={{width:'70%'}}>
                            <p>{bio}</p>
                        </div>
                        <br></br>
                        {/* <TipBox 
                            style={{width : '350px',height:'120px'}}
                            title='Daily Tip'
                            description='Some usefull tip in the future'
                            imageSrc='/images/tip.png'
                        /> */}
                    </div>
                    <div className={styles.profileSections} style={{width:'35%'}}>
                        <div className={styles.shadowedBox}>
                                <RemainingSlots maxSlots={maxSlots} usedSlots={posts.length} />
                                <br></br>
                                <SolidButton colorTheme={'black'} onClick={() => console.log('ok')}  ><h3>Buy More AR Slots</h3></SolidButton>
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
                    </div>
                </div>
                <br></br>
                <div className={styles.profilePostsContainer}>
                    <div className={styles.rowContainer} style={{width:'100%'}}>
                        <div className={styles.rowContainer} style={{justifyContent:'flex-start'}}>
                            <p className={styles.lightColor}>My Posts ( {posts.length} posts )</p>
                        </div>

                        {/* {posts.length !== 0 ?<div style={{width:'140px'}}>
                            <SolidButton onClick={() => router.push('/arstudio')} ><h3>Create AR</h3></SolidButton>
                        </div>:null} */}
                    </div>  
                    <div className={styles.verticalDivider}></div>
                    <PostsList list={posts} searchText={searchText} setSearchText={setSearchText} />
                </div>
                </div>
            </div>
            {fetchingData?<Loading text='Loading ...' />:null}
        </div>
    )
}

export default Profile