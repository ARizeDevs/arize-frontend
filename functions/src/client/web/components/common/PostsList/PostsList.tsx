import React , { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import firebase from '../../../config/firebase'
import Input from '../inputs/Input'
import SearchIcon from '../../../../assets/icons/search-input.svg'
import SolidButton from '../buttons/SolidButton'

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
import EmptyStateIcon from '../../../../assets/banners/Empty state.svg'
import EmptySearchIcon from '../../../../assets/banners/File searching.svg'

import styles from './PostsList.module.css'
import { deletePost, sharePost } from '../../../API'
import Loading from '../Loading'
import QRModal from '../QRModal'
import SharePostModal from '../SharePostModal'
import { UDIDContext } from '../UniqueDeviceIdDetector'

interface IProps {
    searchText : string,
    setSearchText : (txt : string) => void,
    list : IPost[]
}

interface IPost { status: string,arViews : [] , tdViews : [] , shares : [] ,imageURL : string, id : string, title : string }

const SearchBar = ({ text, setText } : { text : string, setText : (text : string) => void }) => {
    return (
        <div style={{width:'100%',position:'sticky',top:'0px'}}>
            <Input required={false} type='text' LeftIcon={SearchIcon} onChange={setText} value={text} />
        </div>
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

const PostCardMenu = ({ onEdit, onView, onInsights, onDelete, onCloseRequest } : { onEdit : ()=>void, onView : ()=>void, onInsights : ()=>void, onDelete : () => void, onCloseRequest : () => void}) => {

    return (
        <>
            <div onClick={() => onCloseRequest()} style={{width:'100vw',height:'100vh',color:'black',opacity:'.3',position:'fixed',left:'0',top:'0',zIndex:3}}>

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

    return (
        <div style={{width:'20vw',display:'flex',flexDirection:'column',margin:'auto',position:'relative'}}>
            <img onClick={() => {if(!processing)router.push(`/post/${id}`)}} className={styles.postItem} src={image} />
            <div className={styles.editPost} onClick={() => setMenuOpen(!menuOpen)}>
                <DotIcon />
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
                    <small style={{color : 'var(--main-lightgray2-color)'}}>{tdViews?Object.keys(tdViews).length:0}</small>
                    &nbsp;
                    &nbsp;
                    <UDIDContext.Consumer >
                        {value => {
                            const addShare = async () => {
                                if(value.UDIDCTX && id) {
                                    if(!shareAdded) {
                                        try {
                                            // @ts-ignore
                                            await sharePost(value.UDIDCTX,value.location, id)
                                            setShareAdded(true)
                                        } catch(error ) {
                                            console.log(error)
                                        }
                                    }
                                }
                            }

                            return (
                                <div onClick={() => {setShareModalOpen(true);addShare()}} className={styles.share}>
                                    {/* @ts-ignore */}
                                    <ShareIcon fill='var(--main-lightgray2-color)'/>
                                </div>
                            )
                        }}
                    </UDIDContext.Consumer>
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
            {processing?<div className={styles.postItem} style={{position:'absolute',backgroundColor:'black',opacity:.6,display:'flex',alignItems:'center',justifyContent:'center'}}><h3 style={{color:'white'}} >Processing ...</h3></div>:null}
        </div>
        
    )
}

const PostsRow = (props : {list : IPost[]}) => {

    return (
        <div style={{marginBottom:'10px',width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            {props.list.map((item, index) => <PostCard key={item.id}  {...item} />)}
        </div>
    )
}

const PostsColumn = (props : {list:IPost[]}) => {
    const renderRows = () => {
        let results = []
        
        let i = 0
        let j = 0
        let chunk = 3;
        for (i=0,j=props.list.length; i<j; i+=chunk) {
            results.push(<PostsRow  list={props.list.slice(i,i+chunk)} />)
        }
        

        return results
    }
    return (
        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
            {renderRows()}
        </div>
    )
}

const Posts = (props : {list:IPost[]}) => {
    return (
        <PostsColumn list={props.list} />
    )
}

const EmptyList = () => {
    const router = useRouter()

    return(
        <div className={styles.column}>
            <EmptyStateIcon />
            <br></br>
            <h4>You have not posted any ar content yet :(</h4>
            <br></br>
            <div style={{width:'140px',marginBottom:'100px'}}>
                <SolidButton onClick={() => router.push('/arstudio')}  ><h3>Get Started</h3></SolidButton>
            </div>
        </div>
    )
}

const NoSearchResultList = () => {
    return(
        <div className={styles.column}>
            <h2>No Results :(</h2>
            <br></br>
            <p>Check your spelling or search something else!</p>
            <br></br>
            <EmptySearchIcon />
        </div>
    )
}

const PostsList = (props : IProps) => {
    const { searchText, setSearchText, list } = props

    const filteredList = list.filter((item) => item.title.indexOf(searchText) !== -1)

    return (
        <div className={styles.root}>
            {
                list.length === 0 ? 
                <EmptyList />:
                filteredList.length === 0 ?
                <NoSearchResultList />:
                <Posts list={filteredList} />
            }
            <br></br>
            <SearchBar text={searchText} setText={setSearchText}  />
        </div>
    )
}

export default PostsList