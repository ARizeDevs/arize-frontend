import { Switch } from '@material-ui/core'
import React from 'react'

interface IProps {
    active : boolean ,
    setActive : (active  :boolean) => void,
    text : string
}

const Toggle = (props : IProps) => {
    const { active, setActive, text } = props

     return (
        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <p style={{fontWeight:'bold'}}>{text}</p>
                <Switch
                    checked={active}
                    onChange={(event) => setActive(event.target.checked)}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
        </div>)
}

export default Toggle