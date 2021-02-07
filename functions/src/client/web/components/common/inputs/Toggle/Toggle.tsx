import { Switch, withStyles } from '@material-ui/core'
import React from 'react'

interface IProps {
    active : boolean ,
    setActive : (active  :boolean) => void,
    text : JSX.Element | string,
    rightToggleLabel? : boolean,
    posit? : string,
  
}

const MySwitch = withStyles({
    switchBase : {
        color: '#FFFFFF',
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
    const { active, setActive, text, rightToggleLabel = false, posit='space-between'} = props
    
     return (
        <div style={{width:'auto',display:'flex',alignItems:'center',flexDirection:'row',justifyContent:posit}}>
            {!rightToggleLabel && <p style={{fontWeight:'bold', display:'flex'}}>{text}</p>}
                <MySwitch
                    checked={active}
                    onChange={(event) => setActive(event.target.checked)}
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                {rightToggleLabel && <p style={{fontWeight:'bold' , display:'flex'}}>{text}</p>}

        </div>)
}

export default Toggle