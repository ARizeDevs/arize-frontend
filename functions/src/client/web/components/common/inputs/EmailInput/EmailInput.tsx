import React from 'react'

import EmailIcon from '../../../../../assets/icons/email.svg'
import Input from '../Input'

interface IProps {
    value:string,
    onChange:Function,
    error? : string,
    maxInputLength? : number,
    text? : string
}

const EmailInput = (props : IProps) => {
    return (
        <>
            <Input placeholder='example@mail.com'  {...props} required type={'email'} text={props.text?props.text:'Email'} LeftIcon={EmailIcon} />
        </>
    )
}

export default EmailInput