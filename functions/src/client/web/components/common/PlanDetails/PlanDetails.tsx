import React from 'react'
import styles from './PlanDetails.module.css'

const PlanDetails = props => {
 
    return <div className={styles.detailsContainer}>
        {props.details.map((detail) => {
        return <p className={styles.detailsItems}>{detail}</p>
        }
        )}
    </div>
  }
  
  export default PlanDetails
  