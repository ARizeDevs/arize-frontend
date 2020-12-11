import React from 'react'

import EmailIcon from '../../../../../assets/icons/email.svg'
import Input from '../Input'

interface IProps {
    value:string,
    onChange:Function
}

const EmailInput = (props : IProps) => {
    return (
        <>
            <Input {...props} required type={'email'} text='Email' LeftIcon={EmailIcon} />
        </>
    )
}

export default EmailInput