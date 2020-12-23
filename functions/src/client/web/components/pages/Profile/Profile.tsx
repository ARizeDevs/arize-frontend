import firebase from 'firebase'
import React , { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getUser } from '../../../API/user'
import SolidButton from '../../common/buttons/SolidButton'

import Navbar from '../../common/Navbar'
import RoundImage from '../../common/RoundImage'

import styles from './Profile.module.css'
import RemainingSlots from '../../common/RemainingSlots'
import ProfileInsights from '../../common/ProfileInsights'
import PostsList from '../../common/PostsList'
import Loading from '../../common/Loading'

const Profile = () => {
    const router = useRouter()
    const [ searchText, setSearchText ] = useState('')
    
    const [ imageSrc, setImageSrc ] = useState('')
    const [ name, setName ] = useState('')
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

    useEffect(() => {
        const getInitData = async () => {
            firebase.auth().onAuthStateChanged(async function(user) {
                try {
                    if(user) {
                        const user = await getUser(true)
                        if(user && user.data.data){
                            const userData = user.data.data.data
                            setName(userData.name)
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
                } catch(error) {
    
                } finally {
                    setFetchingData(false)
                }
            })
        }

        getInitData()
    }, [])


    return (
        <div className={styles.root}>
            <Navbar />
            <div className={styles.bodyContainer}>
                <div style={{width:'90%'}}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileSections}>
                        <div style={{width : "90px" , height:'90px'}}>
                            <RoundImage
                                imageSrc={imageSrc}
                                unchangeable
                            />
                        </div>
                        <h1>{`${name} ${surname}`}</h1>
                        <small className={styles.lightColor}>{location}</small>
                        <p>{bio}</p>
                        <br></br>
                        <div style={{width : '100px'}}><SolidButton styleClass={styles.editProfileBTN} colorTheme='white' onClick={() => router.push('/edit-profile')} ><h3 style={{color : 'black'}}>Edit Profile</h3></SolidButton></div>
                    </div>
                    <div className={styles.profileSections}>
                        <div className={styles.shadowedBox}>
                            <div style={{width : '80%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
                                <br></br>
                                <RemainingSlots maxSlots={maxSlots} usedSlots={posts.length} />
                                <br></br>
                                <SolidButton colorTheme={'black'} onClick={() => console.log('ok')}  ><h3>Buy More AR Slots</h3></SolidButton>
                                <br></br>
                            </div>
                        </div>
                            <br></br>
                            <div className={styles.shadowedBox}>
                                <div style={{width:'80%'}}>
                                    <br></br>
                                    <ProfileInsights 
                                        arViews={arViews}
                                        shares={totalShares}
                                        tdViews={tdViews}
                                        clicks={clicks}
                                    />
                                    <br></br>
                                </div>
                            </div>
                    </div>
                </div>
                <br></br>
                <div className={styles.profilePostsContainer}>
                    <div className={styles.rowContainer} style={{width:'100%'}}>
                        <div className={styles.rowContainer} style={{justifyContent:'flex-start'}}>
                            <p className={styles.lightColor}>My Posts</p>
                        </div>
                        <div style={{width:'100px'}}>
                            <SolidButton onClick={() => router.push('/arstudio')} ><h3>Create AR</h3></SolidButton>
                        </div>
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