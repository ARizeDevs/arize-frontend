import React from 'react'

import ShareIcon from '../../../../assets/icons/share.svg'
import ClickIcon from '../../../../assets/icons/click.svg'
import ARViewsIcon from '../../../../assets/icons/ar-views.svg'
import SelectionIcon from '../../../../assets/icons/selection.svg'
import TDViewsIcon from '../../../../assets/icons/3d-views.svg'

import styles from './ProfileInsights.module.css'

interface IProps {
    shares : number,
    tdViews : number,
    arViews : number,
    clicks : number,
}

const Circle = ({Icon} : {Icon : any}) => {
    return (
        <div className={styles.circle}>
            <div style={{width:'24px',height:'24px'}}>
                <Icon />
            </div>
        </div>
    )
}

const Item = ({ value, Icon } : {value : any , Icon : any}) => {
    return (
        <div style={{marginRight:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
            <Circle Icon={Icon} />
            <p>{value}</p>
        </div>
    )
}

const ProfileInsights = (props : IProps) => {
    const { arViews, shares, tdViews, clicks } = props

    let conversion : any = '-'
    if(arViews+tdViews !== 0) {
        conversion = (clicks/(arViews+tdViews))*100
    }

    return (
        <div className={styles.root}>
            <h3>Insights</h3>
            <br></br>
            <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',flexWrap:'wrap'}}>
                <Item Icon={ShareIcon} value={shares} />
                <Item Icon={ARViewsIcon} value={arViews} />
                <Item Icon={TDViewsIcon} value={tdViews} />
                <Item Icon={ClickIcon} value={clicks} />
                <Item Icon={SelectionIcon} value={conversion} />
            </div>
        </div>)
}

export default ProfileInsights