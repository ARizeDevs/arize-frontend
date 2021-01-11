
import React , {useState} from 'react'
import SolidButton from '../../common/buttons/SolidButton'
import Toggle from '../inputs/Toggle'
import styles from './PlanType.module.css'
import PlanDetails from '../PlanDetails'
import { IMessageTypes } from '../Message/Message';
import Message from '../Message'

interface IProps {
  buttonTitle:string;
  border1:string;
  buttonColor:string;
  cardTitle:string;
  priceMonthly:string;
  titleColor:string;
  priceYearly:string;
  priceColor:string;
  details:any;
  nothing:boolean;
}


const PlanType = (props : IProps) => {
  const {buttonTitle,border1, buttonColor, cardTitle,titleColor,priceMonthly,priceYearly,priceColor, details} = props
 const [value,setValue]= useState(false)

  return (
   <div className={styles.colomnContainer}>
      <div className={styles.mostPopular}>
        {titleColor && <Message type={IMessageTypes.STARRED} text={'Most Popular'}/>}
      </div>
     <div style={{border:border1}} className={styles.shadowedBox}>
    
      <h1 style={{color:titleColor}} className={styles.tt}>
        {cardTitle}
      </h1>
      <div className={styles.col}>
        <div className={styles.row}>
        {!priceMonthly && <Message type={IMessageTypes.SUCCESS} text={'Active Plan'}/>}
        </div>
        <h2 style={{color:priceColor}}>
          {value ? priceYearly : priceMonthly}
        </h2>
        {priceYearly &&  <label className={styles.label1}>VAT not included!</label>}
        
        {priceYearly &&  <Toggle active={value} posit='flex-start' color='primary' nothing={true} setActive={setValue} text = {value ? <label className={styles.label2}>Yearly (Get 1 month free)</label> : <label className={styles.label1}>Yearly (Get 1 month free)</label>} />}
       
      </div>
      <PlanDetails details={details}/>
      {buttonTitle && <SolidButton styleClass={styles.SolidButton}
        colorTheme={buttonColor}>
        {buttonTitle}
      </SolidButton>}
    </div>
    </div>
  )
}

export default PlanType