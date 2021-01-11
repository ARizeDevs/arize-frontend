import React from 'react'
import styles from './PlanDetails.module.css'

const PlanDetails = props => {
 
    return <div className={styles.p}>
        {props.details.map((detail) => {
        return <p className={styles.pp}>{detail}</p>


        }
        )}
    </div>
  }
  
  export default PlanDetails
  