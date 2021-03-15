import React from 'react'

import styles from './MultiPageFormNavbar.module.css'

interface IProps {
    items : { title? : string , description? : string , name : string }[],
    activeIndex : number,
    onClick : (index:number) => void,
}

const MultiPageFormNavbar = (props : IProps) => {
    const { items, activeIndex} = props

    const renderedTitle = () => {
        if(activeIndex >= items.length) {
            return (
                <>
                    <h1 >{items[items.length-1].title}</h1>
                    <h4>{items[items.length-1].description}</h4>
                </>
            )
        } else {
            return (<>
                <h1>{items[activeIndex].title}</h1>
                <h4>{items[activeIndex].description}</h4>
            </>)
        }
    }

    return (
            <div className={styles.test + ' flex-column'} style={{width:'100%'}}>
                {renderedTitle()}
                <br></br>
            </div>
    )
}

export default MultiPageFormNavbar