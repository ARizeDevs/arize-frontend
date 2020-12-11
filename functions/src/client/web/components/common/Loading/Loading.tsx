import React from 'react'

import LoadingCube from '../../../../assets/icons/loading-cube.svg'

import styles from './Loading.module.css'


interface IProps {
    text? : string
}

const Loading = (props : IProps) => {
    const { text } = props

    return (
        <div className={styles.root + ' flex-column'}>
            <div className={styles.rootCube}>
                <div className={styles.cube1}>
                    <LoadingCube />
                </div>
                <div className={styles.cube2}>
                    <LoadingCube />
                </div>
                <div className={styles.cube3}>
                <LoadingCube />
                </div>
                <div className={styles.cube4}>
                    <LoadingCube />
                </div>
                <div className={styles.cube5}>
                    <LoadingCube />
                </div>
                <div className={styles.cube6}>
                    <LoadingCube />
                </div>
                <div className={styles.cube7}>
                    <LoadingCube />
                </div>
                <div className={styles.cube8}>
                    <LoadingCube />
                </div>
            </div>
                <h4>{text}</h4>
        </div>)
}

export default Loading
