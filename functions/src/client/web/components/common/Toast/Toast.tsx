import React from 'react'

// import InfoIcon from '../../../../assets/icons/exclusionmark black.svg'
import Message from '../Message'
import { IMessageTypes } from '../Message/Message'

import styles from './Toast.module.css'

// interface IProps {
//     appearance : any,
//     children : any
// }

const Toast = ({ children, appearance, transitionState} : { children : any, appearance : string, transitionState : string}) => {

    let type = IMessageTypes.INFO

    if(appearance === 'error'){ 
        type = IMessageTypes.ERROR
    } else if(appearance === 'success'){
        type = IMessageTypes.SUCCESS;
    }


    return (
        <div className={`${styles.shadowedBox} ${transitionState === 'entering' ? styles.fadein : ''} ${transitionState === 'exiting' ? styles.fadeout : ''}` }>
            {/* <InfoIcon />
            &nbsp;&nbsp;
            {children} */}
            <Message text={children} type={type} />
        </div>
    )
}

export default Toast 