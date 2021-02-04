import React from 'react'
import styles from './PlanDetails.module.css'
import BlueChecked from '../../../../assets/icons/blueChecked.svg'
import Crossed from '../../../../assets/icons/Crossed.svg'

interface IProps {
    details : string[]
}

const PlanDetails = (props : IProps) => {
 
<<<<<<< HEAD
    return <div className={styles.detailsContainer}>
        {props.details.map((detail) => {
        return <div className={styles.detailsItems}>{detail.title}
        {detail.checked ? <BlueChecked/> : <Crossed/>}
        </div>
        }
        )}
    </div>
=======
    const { details } = props

    return (
        <div className={styles.detailsContainer}>
            {details.map((detail) => <p className={styles.detailsItems}>{detail}</p>)}
        </div>)
>>>>>>> 16cd5588a80bcd1ef18b60a2f9d593aa3c98839d
  }
  
  export default PlanDetails
  