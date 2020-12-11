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

import styles from './PostsList.module.css'
import { deletePost } from '../../../API'
import Loading from '../Loading'

interface IProps {
    searchText : string,
    setSearchText : (txt : string) => void,
    list : IPost[]
}

interface IPost { status: string,arViews : [] , tdViews : [] , shares : [] ,imageURL : string, id : string, title : string }

const SearchBar = ({ text, setText } : { text : string, setText : (text : string) => void }) => {
    return (
        <Input required={false} text={''} type='text' LeftIcon={SearchIcon} onChange={(e : any) => setText(e.target.value)} value={text} />
    )
}

const PostCardMenuItem = ({ Icon, text, action } : { Icon : any , text : string, action : () => void }) => {
    return (
        <div onClick={action} className={styles.postCardMenuItem}>
            <div style={{marginLeft:'10px',marginRight:'10px'}}>
                <Icon fill='var(--main-lightgray2-color)'/>
            </div>
            <p>{text}</p>
        </div>
    )
}

const PostCardMenu = ({ onEdit, onView, onInsights, onDelete } : { onEdit : ()=>void, onView : ()=>void, onInsights : ()=>void, onDelete : () => void}) => {

    return (
        <div className={styles.postCardMenu}>
            <PostCardMenuItem Icon={EyeIcon} text='View Post' action={onView} />
            <PostCardMenuItem Icon={PenIcon} text='Edit' action={onEdit} />
            <PostCardMenuItem Icon={ChartIcon} text='Insights' action={onInsights} />
            <PostCardMenuItem Icon={TrashIcon} text='Delete' action={onDelete} />
        </div>
    )
}

const PostCard = ({imageURL, id, arViews, shares, tdViews, title, status,} : IPost) => {
    const [ image, setImage ] = useState('')
    const router = useRouter()

    const [ deleting, setDeleting ] = useState(false)
    const [ deletingMessage, setDeletingMessage ] = useState('')
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
            setDeletingMessage('something went wrong')
        } finally {
            setDeleting(false)
            console.log(deletingMessage)
        }
    }

    useEffect(() => {
        firebase.storage().ref(imageURL).getDownloadURL().then((url : string) => {
            console.log(url)
            setImage(url)
        })
    } , [imageURL]) 

    return (
        <div style={{width:'20vw',display:'flex',flexDirection:'column',margin:'auto',position:'relative'}}>
            <img className={styles.postItem} src={image} />
            {processing?<div className={styles.postItem} style={{position:'absolute',backgroundColor:'black',opacity:.6,zIndex:20,display:'flex',alignItems:'center',justifyContent:'center'}}><h3 style={{color:'white'}} >Processing ...</h3></div>:null}
            <div className={styles.editPost} onClick={() => setMenuOpen(!menuOpen)}><DotIcon /></div>
            {menuOpen?<PostCardMenu onEdit={onEdit} onDelete={onDelete} onInsights={onInsights} onView={onView}  />:null}
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
                    <div style={{width:'60px',marginRight:'10px'}}>
                        <SolidButton colorTheme='black' onClick={() => {if(!processing)router.push(`/post/${id}`)}} ><div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}><TDViewIcon /><h3>3D</h3></div></SolidButton>
                    </div>
                    <div style={{width:'60px'}}>
                        <SolidButton onClick={() => {if(!processing)router.push(`/post/${id}`)}} ><div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}><ARViewIcon /><h3>AR</h3></div></SolidButton>
                    </div>
                </div>
            </div>

            {deleting?<Loading text='deleting post ...' />:null}
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

const PostsList = (props : IProps) => {
    const { searchText, setSearchText, list } = props

    const filteredList = list.filter((item) => item.title.indexOf(searchText) !== -1)
    console.log(filteredList)

    return (
        <div className={styles.root}>
            <SearchBar text={searchText} setText={setSearchText} />
            <br></br>
            <Posts list={filteredList} />
        </div>
    )
}

export default PostsList