import React from 'react'

import ShareIcon from '../../../../assets/icons/share16.svg'
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

const Circle = ({Icon,tip} : {Icon : any, tip : string}) => {
    return (
        <>
            <div className={styles.circle}>
                <div style={{width:'24px',height:'24px'}}>
                    <Icon />
                </div>
                <div className={styles.toolTip}>
                    <div className={styles.textPart}>
                        <p>{tip}</p>
                    </div>
                    <div className={styles.tailPart}></div>
                </div>
            </div>
        </>
    )
}

const Item = ({ value, Icon, tip } : {value : any , Icon : any, tip : string}) => {
    return (
        <div style={{marginRight:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
            <Circle tip={tip} Icon={Icon} />
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
            <h4>Insights</h4>
            <br></br>
            <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',flexWrap:'wrap'}}>
                <Item tip='Shares' Icon={ShareIcon} value={shares} />
                <Item tip='3D Views' Icon={TDViewsIcon} value={tdViews} />
                <Item tip='AR Views' Icon={ARViewsIcon} value={arViews} />
                <Item tip='Clicks' Icon={ClickIcon} value={clicks} />
                <Item tip='Conversion' Icon={SelectionIcon} value={conversion} />
            </div>
        </div>)
}

export default ProfileInsights