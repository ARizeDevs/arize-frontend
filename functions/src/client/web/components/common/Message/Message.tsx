import React from 'react'

import ErrorTriangle from '../../../../assets/icons/error-triangle.svg'
import SuccessSign from '../../../../assets/icons/success-sign.svg'
import InfoIcon from '../../../../assets/icons/exclamation.svg'
import StarredIcon from '../../../../assets/icons/starred.svg'

import styles from './Message.module.css'

interface IProps {
    text : string,
    type : IMessageTypes
}

export enum IMessageTypes {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    STARRED = 'STARRED',
    ACTIVE = 'ACTIVE'
}

const Message = (props : IProps) => {
    const { text, type } = props

    return (
        <div className={styles.container}>
            {type === IMessageTypes.ERROR? <ErrorTriangle />:null}
            {type === IMessageTypes.SUCCESS? <SuccessSign />:null}
            {type === IMessageTypes.ACTIVE? <SuccessSign />:null}
            {type === IMessageTypes.INFO? <InfoIcon />:null}
            {type === IMessageTypes.STARRED? <StarredIcon/>:null}
            &nbsp;&nbsp;
            
            <small 
                className={
                    `
                    ${type === IMessageTypes.ERROR? styles.errorText : ' '}
                    ${type === IMessageTypes.SUCCESS? styles.successText : ' '}
                    ${type === IMessageTypes.ACTIVE? styles.activeText : ' '}
                    ${type === IMessageTypes.INFO? styles.infoText : ' '}
                    ${type === IMessageTypes.STARRED? styles.starredText : ' '}

                    `
                }
            >
                {text}
            </small>
        </div>
    )
}

export default Message