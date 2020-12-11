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
            <p>Placement*</p>
            <div className={styles.itemsContainer}>
                <div onMouseLeave={() => setOnTheGroundHover(false)} onMouseEnter={() => setOnTheGroundHover(true)} onClick={() => setIsOnTheGround(true)} className={styles.items}>
                    {isOnTheGround?<GroundActive /> : onTheGroundHover?<GroundHover /> : <GroundDeactive />}
                </div>
                <div onMouseLeave={() => setOnTheWallHover(false)} onMouseEnter={() => setOnTheWallHover(true)} onClick={() => setIsOnTheGround(false)} className={styles.items}>
                    {!isOnTheGround?<WallActive /> : onTheWallHover?<WallHover /> : <WallDeactive />}
                </div>
            </div>
        </div>
    )
}

export default Placement