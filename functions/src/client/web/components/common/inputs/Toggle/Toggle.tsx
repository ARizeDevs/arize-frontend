import { Switch, withStyles } from '@material-ui/core'
import React from 'react'

interface IProps {
    active : boolean ,
    setActive : (active  :boolean) => void,
    text : string
}

const MySwitch = withStyles({
    switchBase : {
        color: '#0078FF',
        '&$checked': {
            color: '#0078FF',
        },
        '&$checked + $track': {
            backgroundColor: '#0078FF',
        },
    },
    checked: {},
    track: {},
})(Switch)

const Toggle = (props : IProps) => {
    const { active, setActive, text } = props

     return (
        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <p style={{fontWeight:'bold'}}>{text}</p>
                <MySwitch
                    checked={active}
                    onChange={(event) => setActive(event.target.checked)}
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
        </div>)
}

export default Toggle