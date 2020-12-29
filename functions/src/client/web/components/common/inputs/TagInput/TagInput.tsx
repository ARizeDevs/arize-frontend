import React, { useState } from 'react'


import TagList from '../../TagList'
import Input from '../Input'

interface IProps {
   tags : string[],
   onTagsChanged : (tags : string[]) => void,
   error? : string,
   maxInputLength? : number,
   placeholder? : string
}

const TagInput = (props : IProps) => {
    const { tags, onTagsChanged, placeholder, error, maxInputLength } = props
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
            <Input placeholder={placeholder} maxInputLength={maxInputLength} error={error} onKeyDown={handleKeyDown} value={value} onChange={setValue} required type='text' text='Post Tags' />
            <TagList tags={tags} onCloseClick={handleCloseTag} />
        </>
    )
}

export default TagInput