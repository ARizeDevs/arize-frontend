import React from 'react'

import styles from './Tag.module.css'

interface IProps {
    onCloseClick? : () => void,
    text:string
}

const Tag = (props : IProps) => {
    const { text, onCloseClick } = props

    const renderClose = () => {
        return <div onClick={onCloseClick?onCloseClick:() => {}} style={{cursor : 'pointer' ,width:'25px', height:'25px' ,backgroundColor:'white',borderRadius:'50%', marginLeft:'15px', alignItems:'center',justifyContent:'center'}} className='flex-row'>
            <p style={{lineHeight:'10px',color:'var(--main-blue-color)'}}>X</p>
        </div>
    }

    return (
        <span className={`${styles.root}`}>
            <p>{text}</p>
            {renderClose()}
        </span>
    )
}

export default Tag