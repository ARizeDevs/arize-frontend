import React from 'react'
import { RadioGroup, Radio } from '@material-ui/core'

interface IProps {
    value : string ,
    onChange : (e : any ) => void ,
    items : string[] ,
    title : string
}

const RadioInput = (props : IProps) => {
    const { onChange, value, items, title } = props

    const renderedRadios = items.map((item) => {
        return <div key={item} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Radio style={{color:'var(--main-blue-color)'}} checked={item === value} value={item} />
                {item}
            </div>
    })

    return (
        <div style={{width:'100%'}}>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={onChange}>
                {title}*
                {renderedRadios}
        </RadioGroup>
        </div>
    )
}

export default RadioInput