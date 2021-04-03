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
    let backColor = "#ffffff";

    if(appearance === 'error'){ 
        type = IMessageTypes.ERROR
        backColor = "#EE5253";
    } else if(appearance === 'success'){
        type = IMessageTypes.SUCCESS;
        backColor = "#47D27E"
    } else if(appearance === "info")
    {
        type = IMessageTypes.INFO;
        backColor = "#0078FF";
    }


    return (
        <div className={`${styles.shadowedBox} ${transitionState === 'entering' ? styles.fadein : ''} ${transitionState === 'exiting' ? styles.fadeout : ''}` }
            style={{backgroundColor:backColor}}>
            {/* <InfoIcon />
            &nbsp;&nbsp;
            {children} */}
            <Message text={children} type={type} />
        </div>
    )
}

export default Toast 