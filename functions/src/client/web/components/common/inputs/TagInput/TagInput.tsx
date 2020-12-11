import React, { useState } from 'react'


import TagList from '../../TagList'
import Input from '../Input'

interface IProps {
   tags : string[],
   onTagsChanged : (tags : string[]) => void
}

const TagInput = (props : IProps) => {
    const { tags, onTagsChanged } = props
    const [ value, setValue ] = useState('')

    const handleKeyDown = (e : any) => {
        if (e.key === 'Enter') {
            tags.push(value)
            onTagsChanged(tags)
            setValue('')
        }
    }

    const handleCloseTag = (closeIndex : number) => onTagsChanged(tags.filter((tag : string, index : number) => index !== closeIndex))

    return (
        <>
            <Input onKeyDown={handleKeyDown} value={value} onChange={(e : any) => setValue(e.target.value)} required type='text' text='Post Tags' />
            <TagList tags={tags} onCloseClick={handleCloseTag} />
        </>
    )
}

export default TagInput