import React from 'react'

import styles from './ARTypeCard.module.css'

interface IProps {
    Icon : any,
    text : string,
    onClick : () => void
}

const ARTypeCard = (props : IProps) => {
    const { Icon, text, onClick } = props

    return (
        <div onClick={onClick} className={styles.root}>
            {Icon?<Icon fill='black' />:null}
            <small>{text}</small>
        </div>
    )
}

export default ARTypeCard