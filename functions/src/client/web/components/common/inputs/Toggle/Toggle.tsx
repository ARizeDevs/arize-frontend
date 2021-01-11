import { Switch } from '@material-ui/core'
import React from 'react'

interface IProps {
    active : boolean ,
    setActive : (active  :boolean) => void,
    text : string,
    nothing : boolean,
    posit : string,
  
}

const Toggle = (props : IProps) => {
    const { active, setActive, text, nothing = false, posit='space-between'} = props
    
     return (
        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:posit}}>
            {!nothing && <p style={{fontWeight:'bold'}}>{text}</p>}
                <Switch
                    checked={active}
                    onChange={(event) => setActive(event.target.checked)}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                {nothing && <p style={{fontWeight:'bold'}}>{text}</p>}

        </div>)
}

export default Toggle