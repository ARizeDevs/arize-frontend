import React , { useState, useEffect} from 'react'
import QRCode from 'qrcode.react'

import { getDirectURL } from '../../../config/firebase'
import SolidButton from '../../common/buttons/SolidButton'

import Modal from 'react-modal'
import Navbar from '../../common/Navbar'
import PostScrollList from '../../common/PostScrollList'
import RoundImage from '../../common/RoundImage'
import ModelViewer from '../ModelViewer'

import EmailIcon from '../../../../assets/icons/email2.svg'
import WebsiteIcon from '../../../../assets/icons/website.svg'
import ShareIcon from '../../../../assets/icons/share2.svg'

import styles from './Post.module.css'
import { useRouter } from 'next/router'

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

    useEffect(() => {
        if(post.author && post.author.profilePicURL) {
            getDirectURL(post.author.profilePicURL).then((url) => setProfileImageSrc(url))
        }
        getDirectURL(post.glbFileURL).then((url) => setGLBUrl(url))
        getDirectURL(post.usdzFileURL).then((url) => setUSDZUrl(url))
        getDirectURL(post.imageURL).then((url) => setPoster(url))
        if(post.backGroundImage) getDirectURL(post.backGroundImage).then((url) => setBackgrounImage(url))

    })

    return (
        <div className={styles.root}>
            <Navbar />
            <div className={styles.bodyContainer}>
                <br></br>
                <div className={styles.modelViewer}>
                    <ModelViewer  
                        usdzURL={usdzURL} 
                        glbURL={glbURL} 
                        poster={poster}
                        autoPlay={post.autoPlay}
                        background={backGroundImage} 
                        actionButtonText={post.actionButtonText}
                        actionButtonInfoBackgroundColor={post.actionInfoBackgroundColor}
                        actionButtonLink={post.actionButtonLink}
                        actionButtonColor={post.actionButtonColor}
                        actionButtonTextColor={post.actionBUttonTextColor}
                    />
                </div>
                <br></br>
                <div className={styles.column + ' ' + styles.container} style={{width:'50%'}}>
                    <div className={styles.row} style={{width:'100%',justifyContent:'space-between'}}>
                        <div className={styles.row}>
                            <div style={{width:'40px',height:'40px'}}>
                                <RoundImage imageSrc={profileImageSrc} unchangeable />
                            </div>&nbsp;
                            <div className={styles.column}>
                                <h3>{post.author.username}</h3>
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
                            <div onClick={() => setShareModalOpen(true)} className={styles.icon + ' ' + styles.column} style={{alignItems:'center'}} >
                                <ShareIcon />
                                <p className={styles.grayColor} >{post.shares?post.shares.length:0}</p>
                            </div>&nbsp;
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.row} style={{width:'100%',justifyContent:'space-between'}}>
                        <div className={styles.column} style={{width:'60%'}}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                        </div>
                        <div className={styles.column} style={{width:'30%',marginRight : '20px'}}>
                            <div style={{width:'100%',marginBottom : '10px'}}>
                                <SolidButton onClick={() => router.push(post.actionButtonLink)} styleClass={styles.btn} colorTheme={post.actionBUttonTextColor} ><h3 style={{color:post.actionBUttonTextColor}}>{post.actionButtonText}</h3></SolidButton>
                            </div>
                            <div style={{width:'100%',marginBottom : '10px'}}>
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
            <Modal
                isOpen={shareModalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setShareModalOpen(false)}
                className={styles.shareModal}
                overlayClassName={styles.overlay}
                contentLabel="Example Modal"
                >
                    <div className={styles.column} style={{width:'100%',justifyContent:'space-evenly',height:'100%',paddingLeft:'50px'}} >
                        <div className={styles.row}>
                            <h3>Embed link : </h3>&nbsp;<a href={`https://arizear.app/model-viewer/${post.id}`}>{`https://arizear.app/model-viewer/${post.id}`}</a>
                        </div>
                        <div className={styles.row}>
                            <h3>link : </h3>&nbsp;<a href={`https://arizear.app/post/${post.id}`}>{`https://arizear.app/post/${post.id}`}</a>
                        </div>
                    </div>
            </Modal>
            <Modal
                isOpen={qrModalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setQRModalOpen(false)}
                className={styles.qrModal}
                overlayClassName={styles.overlay}
                contentLabel="Example Modal"
                >
                    <div className={styles.column} style={{width:'100%',justifyContent:'center',alignItems:'center',height:'100%'}} >
                        <div style={{width:'100%',paddingLeft:'30px'}}><button onClick={() => setQRModalOpen(false)} style={{border:'none',backgroundColor:'var(--main-blue-color)',color:'white',borderRadius:'50%',width:'30px',height:'30px',outline:'none',cursor:'pointer'}}>X</button></div>
                        <QRCode value={`https://arizear.app/model-viewer/${post.id}`} />
                        <br></br>
                        <p className={styles.grayColor}>Scan to see AR</p>
                    </div>
            </Modal>
        </div>
    )
}

export default Post