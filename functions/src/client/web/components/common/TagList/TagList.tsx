import React from 'react'

import Tag from '../Tag'

import styles from './TagList.module.css'

interface IProps {
    tags : string[],
    onCloseClick? : (index : number ) => void
}

const TagList = (props : IProps) => {
    const { tags, onCloseClick } = props

    const renderedTags = tags.map((tag : string,index : number) => {
        return <Tag text={tag} key={index} onCloseClick={onCloseClick?()=>onCloseClick(index):() => {}}/>
    })

    return (
        <div className={styles.root}>
            {renderedTags}
        </div>
    )
}

export default TagList