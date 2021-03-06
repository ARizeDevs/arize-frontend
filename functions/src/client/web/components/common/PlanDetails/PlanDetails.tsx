import React from 'react'
import styles from './PlanDetails.module.css'
import BlueChecked from '../../../../assets/icons/blueChecked.svg'
import Crossed from '../../../../assets/icons/Crossed.svg'

interface IProps {
    details : { checked : boolean, title : string }[]
}

const PlanDetails = (props : IProps) => {
 
    return <div className={styles.detailsContainer}>
        {props.details.map((detail) => {
        return <div className={styles.detailsItems}>{detail.title}
        {detail.checked ? <BlueChecked/> : <Crossed/>}
        </div>
        }
        )}
    </div>
  }
  
  export default PlanDetails
  