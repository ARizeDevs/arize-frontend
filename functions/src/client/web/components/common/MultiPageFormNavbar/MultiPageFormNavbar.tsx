import React from 'react'

import TickIcon from '../../../../assets/icons/tick.svg'

import styles from './MultiPageFormNavbar.module.css'

interface IProps {
    items : { title? : string , description? : string , name : string }[],
    activeIndex : number,
    onClick : (index:number) => void,
}

const MultiPageFormNavbar = (props : IProps) => {
    const { items, activeIndex, onClick } = props

    const renderedItems = items.map(({name}, index) => {

        if(index === 0){
            return (
                <div key={index} onClick={() => onClick(index)} className={(index <= activeIndex ?styles.circleActive:styles.circleDeactive) +' ' + (index < activeIndex ?styles.circleFill:'')}>
                    {index < activeIndex ? <div><TickIcon /></div> : null}
                    <p className={index <= activeIndex ?styles.textActive:styles.textDeactive}>{name}</p>
                </div>
            )
        }else {
            return (
                <React.Fragment key={index}>
                    <div className={index <= activeIndex ?styles.lineActive:styles.lineDeactive}>
                    </div>
                    <div onClick={() => onClick(index)} className={(index <= activeIndex ?styles.circleActive:styles.circleDeactive) +' ' + (index < activeIndex ?styles.circleFill:'')}>
                    {index < activeIndex ? <div><TickIcon /></div> : null}
                        <p className={index <= activeIndex ?styles.textActive:styles.textDeactive}>{name}</p>
                    </div>
                    
                </React.Fragment>
            )
        }
    })

    const renderedTitle = () => {
        if(activeIndex >= items.length) {
            return (
                <>
                    <h1>{items[items.length-1].title}</h1>
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
                <div className={styles.root + ' flex-row'}>
                    {renderedItems}
                </div>
            </div>
    )
}

export default MultiPageFormNavbar