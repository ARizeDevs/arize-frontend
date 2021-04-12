import React , { useState } from 'react'

import GroundDeactive from '../../../../../assets/icons/placement/ground deactive.svg'
import WallDeactive from '../../../../../assets/icons/placement/wall deactive.svg'
import WallHover from '../../../../../assets/icons/placement/wall hover.svg'
import GroundHover from '../../../../../assets/icons/placement/ground hover.svg'
import GroundActive from '../../../../../assets/icons/placement/ground active.svg'
import WallActive from '../../../../../assets/icons/placement/wall active.svg'

import styles from './Placement.module.css'

interface IProps {
    isOnTheGround : boolean ,
    setIsOnTheGround : (value : boolean) => void,
}

const Placement = (props : IProps) => {
    const { isOnTheGround, setIsOnTheGround} = props
    const [ onTheGroundHover , setOnTheGroundHover ] = useState(false)
    const [ onTheWallHover , setOnTheWallHover ] = useState(false)

    return (
        <div className={styles.root}>
            <p style={{fontWeight:900}}>Trigger Position</p>
            <br></br>
            <div className={styles.itemsContainer}>
            <div onMouseLeave={() => setOnTheWallHover(false)} onMouseEnter={() => setOnTheWallHover(true)} onClick={() => setIsOnTheGround(false)} className={styles.items}>
                <p style={{fontWeight:700,fontSize:15}}>On the wall</p>
                <p style={{fontSize:13, marginTop:'10px'}}>Suitable for artworks or object that need to be placed on a wall horizontally </p>
                <br></br>
                    {!isOnTheGround?<WallActive /> : onTheWallHover?<WallHover /> : <WallDeactive />}
                </div>
                <br></br>
                <div onMouseLeave={() => setOnTheGroundHover(false)} onMouseEnter={() => setOnTheGroundHover(true)} onClick={() => setIsOnTheGround(true)} className={styles.items}>
                <p style={{fontWeight:700,fontSize:15}}>On the floor</p>
                <p style={{fontSize:13, marginTop:'10px'}}>Suitable for furniture or object that need to be placed on the ground vertically </p>
                <br></br>
                {isOnTheGround?<GroundActive /> : onTheGroundHover?<GroundHover /> : <GroundDeactive />}
                </div>
                
            </div>
        </div>
    )
}

export default Placement