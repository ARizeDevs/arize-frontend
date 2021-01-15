import React from 'react'
import styles from './PlanDetails.module.css'

interface IProps {
    details : string[]
}

const PlanDetails = (props : IProps) => {
 
    const { details } = props

    return (
        <div className={styles.detailsContainer}>
            {details.map((detail) => <p className={styles.detailsItems}>{detail}</p>)}
        </div>)
  }
  
  export default PlanDetails
  