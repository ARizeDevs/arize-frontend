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
import PenIcon from '../../../../assets/icons/pen2.svg'
import TrashIcon from '../../../../assets/icons/trash-alt.svg'
import ChartIcon from '../../../../assets/icons/chart-line.svg'
import EmptyStateIcon from '../../../../assets/banners/Empty state.svg'

import styles from './PostsList.module.css'
import { deletePost } from '../../../API'
import Loading from '../Loading'
import QRModal from '../QRModal'

interface IProps {
    searchText : string,
    setSearchText : (txt : string) => void,
    list : IPost[]
}

interface IPost { status: string,arViews : [] , tdViews : [] , shares : [] ,imageURL : string, id : string, title : string }

const SearchBar = ({ text, setText } : { text : string, setText : (text : string) => void }) => {
    return (
        <div style={{width:'100%',position:'sticky',top:'0px',zIndex:1}}>
            <Input required={false} text={''} type='text' LeftIcon={SearchIcon} onChange={setText} value={text} />
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
            <div onSeeked={() => console.log('dsa')} onClick={() => onCloseRequest()} style={{width:'100vw',height:'100vh',color:'black',opacity:'.3',position:'fixed',left:'0',top:'0',zIndex:3}}>

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
            <img className={styles.postItem} src={image} />
            {processing?<div className={styles.postItem} style={{position:'absolute',backgroundColor:'black',opacity:.6,zIndex:20,display:'flex',alignItems:'center',justifyContent:'center'}}><h3 style={{color:'white'}} >Processing ...</h3></div>:null}
            <div className={styles.editPost} onClick={() => setMenuOpen(!menuOpen)}>
                <DotIcon />
            </div>
            {menuOpen?<PostCardMenu onCloseRequest={() => setMenuOpen(false)} onEdit={onEdit} onDelete={onDelete} onInsights={onInsights} onView={onView}  />:null}
            <div style={{flexWrap:'wrap',marginTop:'10px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',flexWrap:'wrap',flexDirection:'row'}}>
                    <div style={{width : '20px',height : '20px'}}>
                        {/* @ts-ignore */}
                        <EyeIcon fill='var(--main-lightgray2-color)'/>
                    </div>
                    &nbsp;
                    <small style={{color : 'var(--main-lightgray2-color)'}}>{tdViews?tdViews.length:0}</small>
                    &nbsp;
                    &nbsp;
                    <div style={{width : '20px',height : '20px'}}>
                        {/* @ts-ignore */}
                        <ShareIcon fill='var(--main-lightgray2-color)'/>
                    </div>
                    &nbsp;
                    <small style={{color : 'var(--main-lightgray2-color)'}}>{shares?shares.length:0}</small>
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
            <QRModal 
                isOpen={qrModalOpen}
                onRequestClose={() => setQRModalOpen(false)}
                text='Scan to see AR'
                url={`https://arizear.app/model-viewer/${id}`}
            />
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

const PostsList = (props : IProps) => {
    const { searchText, setSearchText, list } = props

    const filteredList = list.filter((item) => item.title.indexOf(searchText) !== -1)

    return (
        <div className={styles.root}>
            <SearchBar text={searchText} setText={setSearchText}  />
            <br></br>
            {list.length === 0 ? 
            <EmptyList />
            :<Posts list={filteredList} />}
        </div>
    )
}

export default PostsList