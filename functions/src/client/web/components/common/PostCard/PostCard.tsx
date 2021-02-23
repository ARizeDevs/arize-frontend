import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import firebase from '../../../config/firebase'
import { deletePost, sharePost } from '../../../API'
import Loading from '../Loading'
import QRModal from '../QRModal'
import SharePostModal from '../SharePostModal'
import DotIcon from '../../../../assets/icons/3dot.svg'
import EyeIcon from '../../../../assets/icons/eye.svg'
import ShareIcon from '../../../../assets/icons/share.svg'
import ARViewIcon from '../../../../assets/icons/arViewIcon.svg'
import TDViewIcon from '../../../../assets/icons/3dViewIcon.svg'
import ARViewsIcon from '../../../../assets/icons/ar-views.svg'
import TDViewsIcon from '../../../../assets/icons/3d-views.svg'
import PenIcon from '../../../../assets/icons/pen2.svg'
import TrashIcon from '../../../../assets/icons/trash-alt.svg'
import ChartIcon from '../../../../assets/icons/chart-line.svg'

import styles from './PostCard.module.css'
import SolidButton from '../buttons/SolidButton'

interface IPost { status: string,arViews : [] , tdViews : [] , shares : [] ,imageURL : string, id : string, title : string }

const PostCard = ({imageURL, id, arViews, shares, tdViews, title, status,} : IPost) => {

    const [ image, setImage ] = useState('')

    const [ qrModalOpen, setQRModalOpen ] = useState(false)

    const router = useRouter()

    const [ deleting, setDeleting ] = useState(false)
    // const [ deletingMessage, setDeletingMessage ] = useState('')
    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ shareModalOpen, setShareModalOpen ] = useState(false)
    const [ shareAdded, setShareAdded ] = useState(false)

    const processing = status === 'PROCESSING'

    const onEdit = () => router.push(`/arstudio/${id}`)
    const onView = () => router.push(`/post/${id}`)
    const onInsights = () => router.push(`/post/statistics/${id}`)
    const onDelete = async () => {
        if(deleting) return
        
        setDeleting(true)

        try {
            await deletePost(id)
            router.reload()
        } catch(error) {
            console.log(error)
            // setDeletingMessage('something went wrong')
        } finally {
            setDeleting(false)
        }
    }

    useEffect(() => {
        firebase.storage().ref(imageURL).getDownloadURL().then((url : string) => {
            setImage(url)
        })
    } , [imageURL]) 

    const onShareClick = async () => {
        if(typeof window !== 'undefined' && window.navigator) {
            const mobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)

            if(mobile) {
                try {
                    await window.navigator.share({ title: "ARize", url: `https://arizear.app/post/${id}` });
                    console.log("Data was shared successfully");
                } catch (err) {
                    console.error("Share failed:", err.message);
                }    
            } else {
                setShareModalOpen(true);
            }

            if(id) {
                if(!shareAdded) {
                    setShareAdded(true)
                    try {
                        // @ts-ignore
                        await sharePost( id)
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
        }
    }


    return (
        <div className={styles.root}>
            <div className={styles.postImage}>
                <img className={styles.postImage} onClick={() => {if(!processing)router.push(`/post/${id}`)}}  src={image} />
                <div className={styles.editPost} onClick={() => setMenuOpen(!menuOpen)}>
                    <DotIcon />
                </div>
                {processing?<div className={`${styles.processingOverlay}`} ><h3 style={{color:'white'}} >Processing ...</h3></div>:null}
            </div>
            {menuOpen?<PostCardMenu onCloseRequest={() => setMenuOpen(false)} onEdit={onEdit} onDelete={onDelete} onInsights={onInsights} onView={onView}  />:null}
            <div style={{flexWrap:'wrap',marginTop:'10px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',flexWrap:'wrap',flexDirection:'row'}}>
                    <div className={styles.view}>
                        {/* @ts-ignore */}
                        <EyeIcon fill='var(--main-lightgray2-color)'/>
                        <div className={styles.viewToolTip}>
                            <div className={styles.textPart}>
                                <ARViewsIcon />&nbsp;&nbsp;
                                <p>{arViews?Object.keys(arViews).length:0}</p>&nbsp;
                                <div style={{height:'90%',width:'1px',backgroundColor:'var(--main-lightgray2-color'}}></div>&nbsp;
                                <TDViewsIcon />&nbsp;&nbsp;
                                <p>{tdViews?Object.keys(tdViews).length:0}</p>
                            </div>
                            <div className={styles.tailPart}></div>
                        </div>
                    </div>
                    &nbsp;
                    <small style={{color : 'var(--main-lightgray2-color)'}}>{(tdViews?Object.keys(tdViews).length:0) + (arViews?Object.keys(arViews).length:0)}</small>
                    &nbsp;
                    &nbsp;
                        <div onClick={onShareClick} className={styles.share}>
                            {/* @ts-ignore */}
                            <ShareIcon fill='var(--main-lightgray2-color)'/>
                        </div>
                    &nbsp;
                    <small style={{color : 'var(--main-lightgray2-color)'}}>{(shares?Object.keys(shares).length:0) +(shareAdded?1:0)}</small>
                </div>
                &nbsp;&nbsp;
                <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                    <div style={{width:'100px',marginRight:'10px'}}>
                        <SolidButton colorTheme='black' onClick={() => {if(!processing)router.push(`/post/${id}`)}} ><div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}><TDViewIcon /><h3>3D</h3></div></SolidButton>
                    </div>
                    <div style={{width:'100px'}}>
                        <SolidButton onClick={() => setQRModalOpen(true)} ><div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}><ARViewIcon /><h3>AR</h3></div></SolidButton>
                    </div>
                </div>
            </div>

            {deleting?<Loading text='deleting post ...' />:null}
            <SharePostModal 
                modalOpen={shareModalOpen}
                onCloseRequest={() => setShareModalOpen(false)}
                postID={id}
            />
            <QRModal 
                isOpen={qrModalOpen}
                onRequestClose={() => setQRModalOpen(false)}
                text='Scan to see AR'
                url={`https://arizear.app/model-viewer/${id}`}
            />
        </div>
        
    )
}


const PostCardMenu = ({ onEdit, onView, onInsights, onDelete, onCloseRequest } : { onEdit : ()=>void, onView : ()=>void, onInsights : ()=>void, onDelete : () => void, onCloseRequest : () => void}) => {

    return (
        <>
            <div onClick={() => onCloseRequest()} className={styles.postCardMenuOverlay}>

            </div>
            <div className={styles.postCardMenu}>
                <PostCardMenuItem Icon={EyeIcon} text='View Post' action={onView} />
                <PostCardMenuItem Icon={PenIcon} text='Edit' action={onEdit} />
                <PostCardMenuItem Icon={ChartIcon} text='Insights' action={onInsights} />
                <PostCardMenuItem Icon={TrashIcon} text='Delete' action={onDelete} />
            </div>
        </>
    )
}


const PostCardMenuItem = ({ Icon, text, action } : { Icon : any , text : string, action : () => void }) => {
    return (
        <div onClick={action} className={styles.postCardMenuItem}>
            <div style={{marginLeft:'10px',marginRight:'10px'}}>
                <Icon fill='var(--main-lightgray2-color)'/>
            </div>
            <p><small>{text}</small></p>
        </div>
    )
}

export default PostCard