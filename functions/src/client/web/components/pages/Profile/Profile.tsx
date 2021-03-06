import _ from 'lodash'
import React , { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

import EmailIcon from '../../../../assets/icons/email3.svg'
import WebsiteIcon from '../../../../assets/icons/website2.svg'

import { getUser } from '../../../API/user'
import SolidButton from '../../common/buttons/SolidButton'

import Navbar from '../../common/Navbar'
import SolidRoundImage from '../../common/RoundImage/SolidRoundImage'
import TipBox from '../../common/TipBox'

import styles from './Profile.module.css'
import RemainingSlots from '../../common/RemainingSlots'
import ProfileInsights from '../../common/ProfileInsights'
import PostsList from '../../common/PostsList'
import Loading from '../../common/Loading'
import ScrollToTop from '../../common/ScrollToTop'
// import TipBox from '../../common/TipBox'
import useDebounce from '../../../helpers/useDebounce'
import { getAllPosts } from '../../../API/posts'
import { getDirectURL } from '../../../config/firebase'
import ShareProfileButton from './ShareProfileButton'


interface IProps {
    user? : any | null
}

const Profile = (props : IProps) => {
    const { user } = props

    const router = useRouter()
    const [ searchText, setSearchText ] = useState('')
    
    const [ imageSrc, setImageSrc ] = useState('')
    const [ name, setName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ surname, setSurname ] = useState('')
    const [ companyName, setCompanyName ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ posts, setPosts ] = useState<any>([])
    const [ postsCount, setPostsCount ] = useState(0)
    const [ websiteURL, setWebsiteURL ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ maxSlots, setMaxSlots ] = useState(3)
    const [ bio, setBio ] = useState('')
    const [ arViews, setARViews ] = useState(0)
    const [ tdViews, setTDViews ] = useState(0)
    // const [ clicks, setClicks ] = useState(0)
    const [ totalShares, setTotalShares ] = useState(0)
    const [ fetchingData, setFetchingData] = useState(1)
    const [ showGoToTop, setShowGoToTop ] = useState(false)
    const [ fetchingPosts, setFetchingPosts ] = useState(false)
    const [ allPostsFetched, setAllPostsFetched ] = useState(false)
    const [ allSearchPostsFetched, setAllSearchPostsFetched ] = useState(false)
    const [ searchedPosts , setSearchedPosts ] = useState<any>([])
    const [ accountType, setAccountType] = useState('');

    const scrollObject = useRef(null);

    const postsPageSize = 9

    

    const onSearchTextChange = (text : string) => {
        if(fetchingData === 3 ) {
            setAllSearchPostsFetched(false)
            setFetchingPosts(true)
            setSearchedPosts([])


            const set = (_posts : any[] , newPosts : any[]) => setSearchedPosts(newPosts.reverse())
            loadMorePosts(searchedPosts, set, text)
        }
        setSearchText(text)
    }

    const loadMorePosts = useDebounce( (posts : any[], setPosts : (posts : any[], newPosts : any[]) => void, searchText : string | null) => {
        getAllPosts(user && user.id?user.id:null, null, posts.length, postsPageSize, searchText? searchText : null, false, false)
        .then((result : any) => {
            const newPosts = result.data.data

            if((newPosts as any).length < postsPageSize) {
                if(searchText) {
                    setAllSearchPostsFetched(true)
                } else {
                    setAllPostsFetched(true)
                }
            }

            setPosts(posts, newPosts)
        })
        .catch((error : any) => {
            console.log(error)
        })
        .finally(() => {
            setFetchingPosts(false)
        })
    } , 500)

    const onScroll = (e : any) => {
        const scrollY = e.target.scrollTop
        const limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - 30
        
        if(scrollY !== 0) {
            if(limit < scrollY ) {

                if(fetchingData === 3  && !fetchingPosts ) {
                    if(searchText ) {
                        if(!allSearchPostsFetched) {
                            setFetchingPosts(true)
                            
                            const set = (posts : any[] , newPosts : any[]) => setPosts([...newPosts.reverse(),...posts])
                            loadMorePosts(posts, set, searchText)
                        }
                    } else {
                        if(!allPostsFetched) {
                            setFetchingPosts(true)
                            
                            const set = (posts : any[] , newPosts : any[]) => setPosts([...newPosts.reverse(),...posts])
                            loadMorePosts(posts, set, searchText)
                        }
                    }
                }
            }
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
            try {
                let userData = user

                if(user === null) {
                    const result = await getUser(null, true, postsPageSize)
                    if(result && result.data.data){
                        userData = result.data.data
                    }
                }

                if(userData) {
                    setName(userData.name)
                    setUsername(userData.username)
                    setCompanyName(userData.companyName)
                    setSurname(userData.surname)
                    setLocation(userData.location)
                    setWebsiteURL(userData.websiteURL)
                    setEmail(userData.email)
                    setAccountType(userData.accountType)
                    if(userData.profilePicURL) {
                        getDirectURL(userData.profilePicURL).then((url : any) => {
                            setImageSrc(url)
                        })
                    }
                    if(userData.posts) {
                        setPostsCount(userData.postsCount)
                        setPosts(userData.posts.reverse())
                        setTotalShares(userData.totalShares)
                        setARViews(userData.totalARViews)
                        setTDViews(userData.totalTDViews)
                        // setClicks(c)
                    }
                    setMaxSlots(userData.maxSlots)
                    if(userData.bio) setBio(userData.bio)
                }
            } catch(error) {
                console.log(error)
            } finally {
                setFetchingData(2);
            }
        }

        getInitData()
    }, [user])

    useEffect(() => {

        if (fetchingData === 2) setFetchingData(3)
    })

    

    return (
        <div className={styles.root}>
            <Navbar imageSrc={imageSrc} haveMoreSlots={maxSlots - postsCount > 0} accountType={accountType} />
            {/* @ts-ignore */}
            <div ref={scrollObject} className={styles.bodyContainer} onScroll={(e) => onScroll(e)}>
                {showGoToTop?<ScrollToTop onClick={onGoToTopClick} />:null}
                <div className={styles.profileContainer}>
                    <div className={styles.profileSections}>
                        <div className={styles.row}>
                            <div style={{width : "90px" , height:'90px', marginRight:'20px'}}>
                                <SolidRoundImage
                                    imageSrc={imageSrc}
                                />
                                {/* <img 
                                    style={{width:'100%',height:'100%',borderRadius:'50%'}}
                                    src={imageSrc}
                                /> */}
                            </div>
                            {user === null ?<div className={styles.row}>
                                <div style={{width : '110px',marginRight : '10px'}}>
                                <SolidButton styleClass={styles.editProfileBTN} colorTheme='white' onClick={() => router.push('/edit-profile')}><h4 style={{color : 'black'}}>Edit Profile</h4></SolidButton>
                                </div>
                                <ShareProfileButton />
                            </div>:null}
                        </div>
                        <br></br>
                        <h1 className={styles.name}>{companyName?companyName:`${name} ${surname}`}</h1>
                        <p className={styles.lightColor} style={{marginTop:'10px', fontWeight:'bold' , fontSize:20}}>{user?location:username}</p>
                        {user !== null ? <h4 style={{color : 'var(--main-blue-color)'}}>{postsCount} posts</h4> : null}
                        <br></br>
                        <div style={{width:'70%'}}>
                            <p>{bio}</p>
                        </div>
                        <br></br>
                        <TipBox 
                            onClick={()=>{window.open('https://youtu.be/otu_KWfEfUU')}} 
                            style={{width:'50%', marginTop:'10px', cursor:'pointer'}} 
                            title='Tutorial:' 
                            description='Create your first AR in 2 minutes' 
                            imageSrc='/images/createAR.png' ></TipBox>
                    </div>
                    <div className={`${styles.profileSections} ${styles.statisticsSection}`}>
                        
                        {user === null ? 
                            <>
                                <div className={styles.shadowedBox}>
                                    <RemainingSlots maxSlots={maxSlots} usedSlots={postsCount} />
                                    <br></br>
                                    <SolidButton colorTheme={'black'} onClick={() => router.push('/pricing')}  ><h3>Upgrade</h3></SolidButton>
                                </div>
                                <br></br>
                                <div className={styles.shadowedBox} >
                                    <ProfileInsights 
                                        arViews={arViews}
                                        shares={totalShares}
                                        tdViews={tdViews}
                                    />
                                </div>
                                <br></br>
                                <h4 style={{marginLeft:'2px', marginTop:'10px'}}>Don’t have your 3D models? <a href="https://share.hsforms.com/1TC1dBm9KSy2xD89PMRd6cA5ahuz">Click Here</a></h4>
                            </>
                        :   <div className={styles.row}>
                                {websiteURL?<div style={{width : '180px',marginRight : '10px'}}>
                                    <SolidButton styleClass={styles.editProfileBTN} colorTheme='white' onClick={() => {websiteURL?router.push(websiteURL):''}} >
                                        <div className={styles.row} style={{justifyContent:'center'}}>
                                            <WebsiteIcon />
                                            <h4 style={{color : 'black',marginLeft:'10px'}}>Visit Website</h4>
                                        </div>
                                    </SolidButton>
                                </div>:null}
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
                <div className={styles.profilePostsContainer}>
                    {user === null ?
                    <>
                        <div className={styles.rowContainer} style={{width:'100%'}}>
                            <div className={styles.rowContainer} style={{justifyContent:'flex-start'}}>
                                <p style={{fontWeight:'bold', color:'#0078FF'}} >My Posts ({postsCount} posts)</p>
                            </div>

                            {/* {posts.length !== 0 ?<div style={{width:'140px'}}>
                                <SolidButton onClick={() => router.push('/arstudio')} ><h3>Create AR</h3></SolidButton>
                            </div>:null} */}
                        </div>  
                        <div className={styles.verticalDivider}></div>
                    </>
                    : null}
                    <PostsList removeEdits={user !== null} fetchingPosts={fetchingPosts} list={posts} searchList={searchedPosts} searchText={searchText} setSearchText={onSearchTextChange} />
                </div>
                </div>
            {fetchingData !== 3?<Loading text='Loading ...' />:null}
        </div>
    )
}

export default Profile