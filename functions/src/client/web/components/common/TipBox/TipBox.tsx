import React from 'react'

import styles from './TipBox.module.css'

interface IProps {
    style : Object,
    title : string,
    description : string,
    imageSrc : string,
    onClick?: () => void 
}

const TipBox = (props : IProps) => {
    const { style, description, imageSrc, title, onClick} = props

    return (
        <div onClick={onClick} className={styles.shadowedBox} style={style}>

            {/* <div className={styles.mediaContainer} style={{backgroundImage:`url(${imageSrc})`}}>  
            </div> */}

            <img src={imageSrc} className={styles.mediaContainer} />

            <div className={styles.textContainer} style={{marginLeft:'10px'}} >
                <h4 style={{textOverflow: 'ellipsis',overflow:'hidden',whiteSpace:'normal' ,width:'100%',height:'40px',fontSize:16, color:'#FF6F48'}}>{title}</h4>
                <div style={{width:'100%', fontSize:13,color:'#FF6F48', marginTop:'10px'}}>
                    <p style={{textOverflow: 'ellipsis',overflow:'hidden',whiteSpace:'normal' ,width:'100%',height:'30px'}}>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default TipBox