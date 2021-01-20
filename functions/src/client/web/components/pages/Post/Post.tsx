import React , { useState, useEffect} from 'react'

import { getDirectURL } from '../../../config/firebase'
import SolidButton from '../../common/buttons/SolidButton'

import Navbar from '../../common/Navbar'
import PostScrollList from '../../common/PostScrollList'
import ModelViewer from '../ModelViewer'
import QRModal from '../../common/QRModal'

import EmailIcon from '../../../../assets/icons/email2.svg'
import WebsiteIcon from '../../../../assets/icons/website.svg'
import ShareIcon from '../../../../assets/icons/share2.svg'

import styles from './Post.module.css'
import { useRouter } from 'next/router'
import SharePostModal from '../../common/SharePostModal'
import { UDIDContext } from '../../common/UniqueDeviceIdDetector'
import { sharePost } from '../../../API'

interface IProps {
    post : any,
    relatedPosts : any[]
}

const Post = (props : IProps) => {

    const router = useRouter()

    const { post, relatedPosts } = props

    const [ profileImageSrc, setProfileImageSrc ] = useState('')
    const [ glbURL, setGLBUrl] = useState('')
    const [ usdzURL, setUSDZUrl ] = useState('')
    const [ backGroundImage, setBackgrounImage ] = useState('')
    const [ poster, setPoster ] = useState('')
    const [ shareModalOpen, setShareModalOpen ] = useState(false)
    const [ qrModalOpen, setQRModalOpen ] = useState(false)
    const [ shareAdded, setShareAdded ] = useState(false)
    const [ fullScreen, setFullScreen ] = useState(false)

    useEffect(() => {
        if(post.author && post.author.profilePicURL) {
            getDirectURL(post.author.profilePicURL).then((url) => setProfileImageSrc(url))
        }
        getDirectURL(post.glbFileURL).then((url) => setGLBUrl(url)).catch((error) => '')
        getDirectURL(post.usdzFileURL).then((url) => setUSDZUrl(url)).catch((error) => '')
        getDirectURL(post.imageURL).then((url) => setPoster(url)).catch((error) => '')
        if(post.backGroundImage) getDirectURL(post.backGroundImage).then((url) => setBackgrounImage(url)).catch((error) => '')
    })

    const onFullScreenClick = () => setFullScreen(!fullScreen)
    const onVisitProfileClick = () => router.push(`/profile/${post.author.id}`)


    return (
        <div className={styles.root}>
            {!fullScreen?<Navbar noMenu />:null}
            <div className={styles.bodyContainer}>
                <div className={`${styles.modelViewer} ${fullScreen?styles.modelViewerFullScreen:''}`}>
                    <ModelViewer
                        isFullScreen={fullScreen}
                        onFullScreen={onFullScreenClick}
                        key={post.id}
                        showQR={false}
                        title={post.title}
                        actionButtonInfoText={post.actionButtonInfoText}
                        usdzURL={usdzURL} 
                        glbURL={glbURL} 
                        poster={poster}
                        id={post.id}
                        autoPlay={post.autoPlay}
                        background={backGroundImage} 
                        actionButtonText={post.actionButtonText}
                        actionButtonInfoBackgroundColor={post.actionInfoBackgroundColor}
                        actionButtonInfoTextColor={post.actionButtonInfoTextColor}
                        actionButtonLink={post.actionButtonLink}
                        actionButtonColor={post.actionButtonColor}
                        actionButtonTextColor={post.actionBUttonTextColor}
                    />
                </div>
                <br></br>
                <div className={styles.column + ' ' + styles.container} style={{width:'50%'}}>
                    <div className={styles.row} style={{width:'100%',justifyContent:'space-between'}}>
                        <div className={styles.row}>
                            <div onClick={onVisitProfileClick}  style={{cursor:'pointer',width:'40px',height:'40px'}}>
                                <img style={{width: '100%',height: '100%',borderRadius: '50%'}} src={profileImageSrc} />
                            </div>&nbsp;
                            <div className={styles.column}>
                                <h3 onClick={onVisitProfileClick} style={{cursor:'pointer'}}>{post.author.companyName?post.author.companyName:post.author.username}</h3>
                                <p className={styles.grayColor}>{new Date(post.submissionDate).toDateString()}</p>
                            </div>
                        </div>
                            <div className={styles.row}> 
                            {post.author && post.author.websiteURL ?<div onClick={() => router.push(post.author.wewebsiteURL)} className={styles.icon + ' ' + styles.column} style={{alignItems:'center'}} >
                                <WebsiteIcon />
                                <p>&nbsp;</p>
                            </div>:null}&nbsp;
                            <a className={styles.icon + ' ' + styles.column} style={{alignItems:'center'}} href ={`mailto:${post.author.email}?subject = Feedback&body = Message`}>
                                <EmailIcon />
                                <p>&nbsp;</p>
                            </a>&nbsp;
                            <UDIDContext.Consumer >
                                {value => {
                                    const onShareClick = async () => {
                                        if(typeof window !== 'undefined' && window.navigator) {
                                            const mobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
            
                                            if(mobile) {
                                                try {
                                                    await window.navigator.share({ title: "ARize", url: `https://arizear.app/post/${post.id}` });
                                                    console.log("Data was shared successfully");
                                                } catch (err) {
                                                    console.error("Share failed:", err.message);
                                                }    
                                            } else {
                                                setShareModalOpen(true);
                                            }

                                            if(value.UDIDCTX && post.id) {
                                                if(!shareAdded) {
                                                    try {
                                                        // @ts-ignore
                                                        await sharePost(value.UDIDCTX,value.location, post.id)
                                                        setShareAdded(true)
                                                    } catch(error) {
                                                        console.log(error)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    
                                    return (
                                        <div onClick={onShareClick} className={styles.icon + ' ' + styles.column} style={{alignItems:'center'}} >
                                            <ShareIcon />
                                            <p className={styles.grayColor} >{post.shares?Object.keys(post.shares).length:0}</p>
                                        </div>
                                    )
                                }}
                            </UDIDContext.Consumer >
                            &nbsp;
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.row} style={{width:'100%',justifyContent:'space-between'}}>
                        <div className={styles.column} style={{width:'60%'}}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                        </div>
                        <div className={styles.column} style={{width:'30%',marginRight : '20px'}}>
                            {post.hasCallToAction?<div style={{width:'100%',marginBottom : '10px'}}>
                                <SolidButton onClick={() => router.push(post.actionButtonLink)} styleClass={styles.btn} colorTheme={post.actionButtonColor} ><h3 style={{color:post.actionBUttonTextColor}}>{post.actionButtonText}</h3></SolidButton>
                            </div>:null}
                            <div className={styles.pcARViewButton} style={{width:'100%',marginBottom : '10px'}}>
                                <SolidButton onClick={() => setQRModalOpen(true)}  ><h3>AR View</h3></SolidButton>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className={styles.row} style={{width:'100%'}}>
                        <h2>Similar Posts</h2>
                    </div>
                    <div style={{width:'100%'}}>
                        {/* @ts-ignore */}
                        <PostScrollList list={relatedPosts} />
                    </div>
                    <br></br>
                    <br></br>
                </div>
            </div>
            <SharePostModal 
                modalOpen={shareModalOpen}
                onCloseRequest={() => setShareModalOpen(false)}
                postID={post.id}
            />
            <QRModal 
                isOpen={qrModalOpen}
                onRequestClose={() => setQRModalOpen(false)}
                text='Scan to see AR'
                url={`https://arizear.app/model-viewer/${post.id}`}
            />
        </div>
    )
}

export default Post