import React , { useEffect } from 'react'

import MyPieChart from '../../common/charts/MyPieChart'
import RoundImage from '../../common/RoundImage'

import styles from './PostStatistics.module.css'

interface IProps {
    uniqueViews : { location : string , viewer : any , date : string }[],
    totalViews : number
}

const Statistics = (props : IProps) => {
    const { uniqueViews , totalViews } = props

    // const arViews = .7 * totalViews
    // const tdViews = .3 * totalViews

    const maleViews = .3 * totalViews
    const femaleViews = .4 * totalViews
    const otherViews = .3 * totalViews

    const genderBasedItems = [
        {
            name : 'Male Viewers',
            color : 'orange',
            value : femaleViews
        },
        {
            name : 'Female Viewers',
            color : 'green',
            value : maleViews
        },
        {
            name : 'Other Viewers',
            color : 'blue',
            value : otherViews
        }
    ]

    useEffect(() => {
        // TODO : calculate views
    } , [ uniqueViews ])

    return (
        <div className={styles.statisticsRoot}>   
            <div className={styles.chartsContainer}>
                <div style={{width:'15vw',height:'15vw'}}>
                    {/* @ts-ignore */}
                    <MyPieChart title='Total Views' data={[{name : 'AR Views',value : 2000,color:'blue'},{name : '3D Views',value : 3000,color:'orange'}]} />
                </div>
                <div style={{width:'15vw',height:'15vw'}}>
                    {/* @ts-ignore */}
                    <MyPieChart title="Gender-based Views" data={[{name : 'Male',value : 2000,color:'blue'},{name : 'Female',value : 3000,color:'black'},{name : 'Other',value : 1000,color:'red'}]} />
                </div>
            </div>
            <br></br>
            <div className={styles.notChartsContainer}>
                <ListStatistic items={genderBasedItems} title={'Gender-base Views'} />
                <br></br>
                <ListStatistic items={genderBasedItems} title={'Gender-base Views'} />
                <br></br>
                <ListStatistic items={genderBasedItems} title={'Gender-base Views'} />
                <br></br>
                <ListStatistic items={genderBasedItems} title={'Gender-base Views'} />
                <br></br>
                <ListStatistic items={genderBasedItems} title={'Gender-base Views'} />
            </div>
        </div>
    )
}

const ListStatistic = (props : { title : string , items : { name : string , value : number , color? : string , image? : string}[] }) => {
    const { title , items } = props 

    const renderedItems = items.map((item) => {
        return (
            <div key={item.name} className={styles.listStatisticItem}>
                <div className='flex-row'>
                    <div style={{width:'20px',height:'20px',marginRight:'20px'}}>
                        <RoundImage color={item.color} imageSrc={item.image} unchangeable />
                    </div>
                    <p>{item.name}</p>
                </div>
                <p>{item.value}</p>
            </div>
        )
    })

    return (
        <div className={styles.listStatisticRootContainer}>
            <h3 style={{ opacity:.4 }}>{title}</h3>
            {renderedItems}
        </div>
    )
}

export default Statistics