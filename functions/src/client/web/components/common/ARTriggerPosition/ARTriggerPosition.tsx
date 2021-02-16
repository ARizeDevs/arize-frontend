import React, {useState} from 'react'
import Placement from '../../common/inputs/Placement'
import styles from './ARTriggerPosition.module.css'
import SolidButton from '../../common/buttons/SolidButton'


const ARTriggerPosition = ( ) => {
    const [value,setValue]= useState(false)

    return (
        <div>
                <Placement isOnTheGround={value} setIsOnTheGround={setValue}/>
                <div className={styles.buttonWrapper}>
                    <SolidButton onClick={null} ><h3>Next</h3></SolidButton>
                </div>
         </div>
    )

    
}
export default ARTriggerPosition