import React from 'react'
// import { useRouter } from 'next/router'

// import SolidButton from '../../common/buttons/SolidButton'

// import GlobeIcon from '../../../../assets/icons/globe.svg'

// import styles from './Banner.module.css'

interface IProps {
    isAndroid : boolean,
    buttonText : string,
    buttonColor : string,
    buttonTextColor : string,
    infoBackgrounColor : string,
    postTitle : string,
    link : string,
    infoText : string,
    infoTextColor : string
}

const Banner = (_props : IProps) => {
    return <></>
    // const router = useRouter()

    // const { isAndroid, infoTextColor, postTitle, buttonColor, infoText, link, buttonText,buttonTextColor, infoBackgrounColor, } = props

    // if(isAndroid) {
    //     return (
    //         <div className={styles.root} style={{backgroundColor:'white',width:'90%'}}>
    //             <div style={{height:'100%',width:"70%",display:'flex',flexDirection:'column'}}>
    //                 <p style={{width:'100%',height:'30%',wordWrap: 'break-word',textOverflow: 'ellipsis',overflow:'hidden'}}>{postTitle}</p>
    //                 <small style={{color:'var(--main-lightgray2-color)',width:'100%',height:'70%',wordWrap: 'break-word',textOverflow: 'ellipsis',overflow:'hidden'}}>{link}</small>
    //             </div>
    //             <div style={{width:'30%'}}>
    //                 <SolidButton height='30px' onClick={() => router.push(link)} colorTheme={'blue'} ><div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%'}}><GlobeIcon /><p style={{color:'white',marginLeft:'8px'}}>visit</p></div></SolidButton>
    //             </div>
    //         </div>
    //     )
    // }

    // return (
    //     <div className={styles.root} style={{backgroundColor:infoBackgrounColor,marginBottom:'5%'}}>
    //         <div style={{width:"70%",height:'100%'}}>
    //             <p style={{color:infoTextColor,height:'100%',fontSize:'13px',wordWrap: 'break-word',textOverflow: 'ellipsis',overflow:'hidden'}}>{infoText}</p>
    //         </div>
    //         <div style={{width:'30%'}}>
    //             <SolidButton onClick={() => router.push(link)} colorTheme={buttonColor} ><p style={{color:buttonTextColor}}>{buttonText}</p></SolidButton>
    //         </div>
    //     </div>
    // )
}

export default Banner