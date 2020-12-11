import React from 'react'

import ARTypeCard from '../../common/ARTypeCard'

import VideoIcon from '../../../../assets/icons/artype/video.svg'
import TransparentVideoIcon from '../../../../assets/icons/artype/transparent_video.svg'
import ZipIcon from '../../../../assets/icons/artype/zip.svg'
// import SketchfabIcon from '../../../../assets/icons/artype/sketchfab.svg'
import UnityIcon from '../../../../assets/icons/artype/unity.svg'
import LinkIcon from '../../../../assets/icons/artype/link.svg'
// import GoogleployIcon from '../../../../assets/icons/artype/googlepoly.svg'

import styles from './ARizeStudioARTypeSelector.module.css'

const ARTypeList = [
    {
        title : 'video',
        list : [
            {
                Icon : VideoIcon,
                text : 'Video'
            },
            {
                Icon : TransparentVideoIcon,
                text : 'Transparent Video'
            }
        ]
    },
    {
        title : '3D Model',
        list : [
            {
                Icon : ZipIcon,
                text : 'Zip File'
            },
            // {
            //     Icon : SketchfabIcon,
            //     text : 'SketchFab'
            // },
            // {
            //     Icon : GoogleployIcon,
            //     text : 'Google Poly'
            // },
        ]
    },
    {
        title : 'Other',
        list : [
            {
                Icon : LinkIcon,
                text : 'Link'
            },
            {
                Icon : UnityIcon,
                text : 'Unity'
            },
        ]
    },
]

const ARTypeRow = ({list , title , onClick} : {list : { Icon : any , text : string}[], title : string , onClick : (type : string) => void}) => {
    return (
        <>
            <h4 className={styles.arTypeRowTitle} >{title}</h4>
            <div  className={styles.row}>
                {list.map(({Icon ,text}) => {
                    return <ARTypeCard onClick={() => onClick(text)} key={text} Icon={Icon} text={text}/>
                })}
            </div>
        </>
    )
}

interface IProps {
    onSelect : (type : string) => void
}

const ARizeStudioARTypeSelector = (props : IProps) => {

    const { onSelect } = props

    const renderedARTypeItems = ARTypeList.map(({title, list}) => {
        return <ARTypeRow onClick={(type : string) => onSelect(type)} title={title} list={list} />
    })

    return (<>
        <div className={styles.itemsContainer}>
            {renderedARTypeItems}
        </div>
    </>)
}

export default ARizeStudioARTypeSelector