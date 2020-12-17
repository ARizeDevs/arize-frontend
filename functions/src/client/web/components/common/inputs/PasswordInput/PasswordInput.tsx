import React from 'react'

import EyeIcon from '../../../../../assets/icons/eye.svg'
import EyeSlashIcon from '../../../../../assets/icons/eye-slash.svg'
import LockIcon from '../../../../../assets/icons/padlock.svg'
import Input from '../Input'

const LockIconComponent = (props : any) => {
    // @ts-ignore
    return <div {...props}><LockIcon fill={props.fill}/></div>
}

interface IProps {
    value:string,
    onChange:Function,
    onEyeClick:Function,
    eyeOn:boolean,
    confirm?:boolean,
    error? : string,
    maxInputLength? : number
}

const PasswordInput = (props: IProps = { confirm:false, value : '', onChange:()=>{}, onEyeClick:()=>{}, eyeOn:false }) => {
    const { eyeOn, onEyeClick, confirm } = props
    
    return (
        <>
            <Input {...props} required type={eyeOn?'password':'text'} text={confirm?'Confirm Password':'Password'} LeftIcon={LockIconComponent} RightIcon={eyeOn?EyeSlashIcon:EyeIcon} onRightIconClick={onEyeClick}/>
        </>
    )
}

export default PasswordInput