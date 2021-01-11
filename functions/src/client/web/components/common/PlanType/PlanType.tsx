
import React , {useState} from 'react'
import SolidButton from '../../common/buttons/SolidButton'
import Toggle from '../inputs/Toggle'
import styles from './PlanType.module.css'
import PlanDetails from '../PlanDetails'
import { IMessageTypes } from '../Message/Message';
import Message from '../Message'

interface IProps {
  buttonTitle?:string;
  activeBorder?:string;
  buttonColor?:string;
  cardTitle:string;
  priceMonthly?:JSX.Element;
  titleColor?:string;
  priceYearly?:JSX.Element;
  priceColor?:string;
  details:any;
  rightToggleLabel?:boolean;
}


const PlanType = (props : IProps) => {
  const {buttonTitle,activeBorder, buttonColor, cardTitle,titleColor,priceMonthly,priceYearly,priceColor, details} = props
 const [value,setValue]= useState(false)

  return (
   <div className={styles.colomnContainer}>
      <div className={styles.mostPopular}>
        {titleColor && <Message type={IMessageTypes.STARRED} text={'Most Popular'}/>}
      </div>
     <div style={{border:activeBorder}} className={styles.shadowedBox}>
    
      <h1 style={{color:titleColor}} className={styles.titleColor}>
        {cardTitle}
      </h1>
      <div className={styles.choosePlan}>
        
        {!priceMonthly && <Message type={IMessageTypes.SUCCESS} text={'Active Plan'}/>}
        
        <h2 style={{color:priceColor}}>
          {value ? priceYearly : priceMonthly}
        </h2>
        {priceYearly &&  <label className={styles.priceLabel}>VAT not included!</label>}
        
        {priceYearly &&  <Toggle active={value} posit='flex-start' rightToggleLabel={true} setActive={setValue} text = {<label className={`${styles.priceLabel2} ${value ? styles.activePriceLabel : ''}`}>Yearly (Get 1 month free)</label>} />}
        
      </div>
      <PlanDetails details={details}/>
      {buttonTitle && <SolidButton onClick={null} styleClass={styles.SolidButton}
        colorTheme={buttonColor}>
        {buttonTitle}
      </SolidButton>}
    </div>
    </div>
  )
}

export default PlanType