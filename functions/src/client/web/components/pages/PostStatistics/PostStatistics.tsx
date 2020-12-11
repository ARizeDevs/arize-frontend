import React from 'react'
// import { useRouter } from 'next/router'

import Navbar from '../../common/Navbar'
// import PostHeader from '../../common/PostHeader'
// import VersatileImageContainer from '../../common/VersatileImageContainer'
// import Statistics from './Statistics'

// import firebase , { db } from '../../../config/firebase'

// import EyeIcon from '../../../../assets/icons/eye.svg'
// import ShareIcon from '../../../../assets/icons/share16.svg'
// import TDIcon from '../../../../assets/icons/3DIcon.svg'
// import ARIcon from '../../../../assets/icons/ARIcon.svg'

import styles from './PostStatistics.module.css'
// import SolidButton from '../../common/buttons/SolidButton'

interface IProps {
    pid : string[] | string,
}

const PostStatistics = (props : IProps ) => {
    // const router = useRouter()

    // const { pid } = props

    // const [ generalError, setGeneralError ] = useState('')
    // const [ userFullname, setUserFullname ] = useState('')
    // const [ userProfilePicURL, setUserProfilePicURL ] = useState('')
    // const [ postImageURL, setPostImageURL ] = useState('')
    // const [ postTitle, setPostTitle ] = useState('')
    // const [ postDate, setPostDate ] = useState('')
    // const [ postTotalViews, setPostTotalViews ] = useState(0)

    // useEffect(() => {
    //     const getPost = async () => {
    //         console.log(pid)
    //         if(pid) {
    //             try {
    //                 firebase.auth().onAuthStateChanged(async function(user) {
    //                     if(user) {
    //                         const userDoc = await db.collection('users').doc(user.uid).get()
    //                         if(userDoc.exists){
    //                             const userData = userDoc.data()
    //                             if(userData) {
    //                                 let isPostForMe = false
    //                                 userData.posts.forEach((post : any) => {
    //                                     if(post.id === pid) {
    //                                         isPostForMe = true
    //                                     }
    //                                 })

    //                                 if(!isPostForMe) {
    //                                     router.push('/forbidden')
    //                                 }

    //                                 setUserFullname(userData.name + ' ' + userData.surname)
    //                                 firebase.storage().ref(userData.profilePicURL).getDownloadURL().then((url : string) => {
    //                                     setUserProfilePicURL(url)
    //                                 })
    //                             }
    //                         }
    //                     }
    //                 })

    //                 let post = null
    //                 if(typeof pid === typeof []) {
    //                     post = await db.collection('posts').doc(pid[0]).get()
    //                 } else {
    //                     post = await db.collection('posts').doc(pid as string).get()
    //                 }
    //                 if(post && post.exists) {
    //                     let postData = post.data()
    //                     if(postData) {
    //                         setPostTitle(postData.title)
    //                         setPostDate(postData.submissionDate)
    //                         firebase.storage().ref(postData.imageURL).getDownloadURL().then((url : string) => {
    //                             setPostImageURL(url)
    //                         })
    //                         setPostTotalViews(postData.totalViews)
    //                     }
    //                 }
    //             } catch(error) {
    //                 console.log(error)
    //                 setGeneralError('Something went wrong while reading your post please try again')
    //             }
    //         }
    //     }

    //     getPost()
    // } , [pid])

    return (
        <div className={styles.root}>
            <Navbar />
            <div className={styles.bodyContainer}>
                <h1 style={{color:'var(--main-lightgray2-color)'}}>Coming soon ...</h1>
            </div>
        </div>
    )
}

                // <div className={styles.columnContainer}>
                //     <PostHeader date={postDate} title={postTitle} userFullname={userFullname} userProfilePicURL={userProfilePicURL} />
                //     <div style={{width:'100%',flexGrow:1,marginTop:'20px'}}>
                //         <VersatileImageContainer imageURL={postImageURL} />
                //     </div>
                //     <div className={styles.footer}>
                //         <div className='flex-row' style={{display:'flex',alignItems:'center'}}>
                //             <EyeIcon /> &nbsp;
                //             <p style={{opacity:.4}}>
                //                 {postTotalViews}
                //             </p> &nbsp; &nbsp;
                //             {/* @ts-ignore */}
                //             <ShareIcon fill='black'/>&nbsp;
                //             <p style={{opacity:.4}}>
                //                 {postTotalViews}
                //             </p>
                //         </div>
                //         <div className='flex-row' style={{display:'flex',alignItems:'center'}}>
                //             <div className={styles.buttonContainer}>
                //                 <SolidButton colorTheme='black' onClick={() => console.log('3D')} ><h3 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><TDIcon />3D</h3></SolidButton>
                //             </div>&nbsp;
                //             <div className={styles.buttonContainer}>
                //                 <SolidButton onClick={() => console.log('3D')} ><h3 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><ARIcon />AR</h3></SolidButton>
                //             </div>
                //         </div>
                //     </div>
                // </div>
                // <div className={styles.columnContainer}>
                //     <Statistics totalViews={postTotalViews} uniqueViews={[]} />
                // </div>
export default PostStatistics