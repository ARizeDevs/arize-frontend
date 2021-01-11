import React from 'react'

import InfoIcon from '../../../../assets/icons/exclusionmark black.svg'

import styles from './Toast.module.css'

// interface IProps {
//     appearance : any,
//     children : any
// }

const Toast = (props : any) => {
    const { children } = props

    return (
        <div className={`${styles.shadowedBox} ${props.transitionState === 'entering' ? styles.fadein : ''} ${props.transitionState === 'exiting' ? styles.fadeout : ''}` }>
            <InfoIcon />
            &nbsp;&nbsp;
            {children}
        </div>
    )
}

export default Toast 