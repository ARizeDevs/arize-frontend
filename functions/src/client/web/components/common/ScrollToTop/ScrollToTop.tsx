import React from 'react'

import GoUpIcon from '../../../../assets/icons/go up.svg'

import styles from './ScrollToTop.module.css'

interface IProps {
    onClick : () => void
}

const ScrollToTop = (props : IProps) => {
    const { onClick } = props

    return (
        <div className={styles.root} onClick={onClick}>
            <GoUpIcon />
        </div>
    )
}

export default ScrollToTop