import { getCode } from 'country-list'
import React, { useEffect, useState } from 'react'
import MultiChoiceButtonGroup from '../../common/inputs/MultiChoiceButtonGroup'
import Loading from '../../common/Loading'
// @ts-ignore
import ReactCountryFlag  from "react-country-flag"

import Navbar from '../../common/Navbar'
import SolidRoundImage from '../../common/RoundImage/SolidRoundImage'
import DetailBox from './DetailBox'

import styles from './PostStatistics.module.css'
import TotalBox from './TotalBox'

interface IProps {
    statistics : any,
    thumbnail : string,
    title : string,
    date : string
}

const timeIntervalChoices = ['24 Hours', '7 Days', '30 Days', '90 Days', 'All time', ]
const timeIntervalLabels = ['lastDay', 'last7Days', 'last30Days', 'last90Days', 'total']

const PostStatistics = (props : IProps ) => {

    const { statistics, date, thumbnail, title } = props
    
    
    const [timeIntervalChoice, setTimeIntervalChoice] = useState(4)
    const [ arViewsCount, setARViewsCount] = useState(0)
    const [ tdViewsCount, setTDViewsCount] = useState(0)
    const [ sharesCount, setSharesCount] = useState(0)
    const [ referrerData, setReferrerData ] = useState<any>([])
    const [ locationData, setLocationData ] = useState<any>([])

    useEffect(() => {
        if(statistics) {
            const statisticsData = statistics.data

            setARViewsCount(statisticsData.AR_VIEW && statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]] && statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]].count ? statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]].count : 0)
            setTDViewsCount(statisticsData.TD_VIEW && statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]] && statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]].count ? statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]].count : 0)
            setSharesCount(statisticsData.SHARE && statisticsData.SHARE[timeIntervalLabels[timeIntervalChoice]] && statisticsData.SHARE[timeIntervalLabels[timeIntervalChoice]].count ? statisticsData.SHARE[timeIntervalLabels[timeIntervalChoice]].count : 0)

            const tempReferrerData : any = {}
            const tempLocationData : any = {}

            let AR_VIEW_referrer = {}
            let TD_VIEW_referrer = {}
            let AR_VIEW_location = {}
            let TD_VIEW_location = {}
            if(statisticsData.AR_VIEW && statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]] && statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]].referrer) {
                AR_VIEW_referrer = statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]].referrer
            }

            if(statisticsData.AR_VIEW && statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]] && statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]].location) {
                AR_VIEW_location = statisticsData.AR_VIEW[timeIntervalLabels[timeIntervalChoice]].location
            }

            if(statisticsData.TD_VIEW && statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]] && statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]].referrer) {
                TD_VIEW_referrer = statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]].referrer
            }

            if(statisticsData.TD_VIEW && statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]] && statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]].location) {
                TD_VIEW_location = statisticsData.TD_VIEW[timeIntervalLabels[timeIntervalChoice]].location
            }

            const getCountryLogo = (country : string) => {
                const code : string | undefined  = getCode(country)
                if(!code) return null
                return <ReactCountryFlag 
                        countryCode={code}
                        aria-label="United States"
                        svg
                        style={{
                            width: '20px',
                            height: '20px',
                            botderRadius : '50%'
                        }}
                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                        cdnSuffix="svg"
                        title="US"
                    />

            }

            for(const [referrerDomain, value] of Object.entries(AR_VIEW_referrer)) {
                if(!tempReferrerData[referrerDomain]) {
                    tempReferrerData[referrerDomain] = {
                        Logo: <img src='/images/earth-globe.png' style={{width : '20px',height:'20px'}} />,
                        label: referrerDomain,
                        arView : value,
                        tdView : 0
                    }
                } else {
                    tempReferrerData[referrerDomain].arView += value
                }
            }

            for(const [referrerDomain, value] of Object.entries(TD_VIEW_referrer)) {
                if(!tempReferrerData[referrerDomain]) {
                    tempReferrerData[referrerDomain] = {
                        Logo: <img src='/images/earth-globe.png' style={{width : '20px',height:'20px'}} />,
                        label : referrerDomain,
                        arView : 0,
                        tdView : value
                    }
                } else {
                    tempReferrerData[referrerDomain].tdView += value
                }
            }


            for(const [location, value] of Object.entries(AR_VIEW_location)) {
                if(!tempLocationData[location]) {
                    tempLocationData[location] = {
                        label : location,
                        Logo:getCountryLogo(location),
                        arView : value,
                        tdView : 0
                    }
                } else {
                    tempLocationData[location].arView += value
                }
            }

            for(const [location, value] of Object.entries(TD_VIEW_location)) {
                if(!tempLocationData[location]) {
                    tempLocationData[location] = {
                        label : location,
                        Logo:getCountryLogo(location),
                        arView : 0,
                        tdView : value
                    }
                } else {
                    tempLocationData[location].tdView += value
                }
            }

            setLocationData(Object.values(tempLocationData).sort((a : any,b : any) => - a.arView - a.tdView + b.arView + b.tdView))
            setReferrerData(Object.values(tempReferrerData).sort((a : any,b : any) => - a.arView - a.tdView + b.arView + b.tdView))
        }

    }, [statistics, timeIntervalChoice])

    console.log(locationData);


    return (
        <div className={styles.root}>
            <Navbar />
            <div className={styles.bodyContainer}>
                <div className={styles.header}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >
                        <div style={{ width : '72px', height : '72px',marginRight:'8px'}}>
                            <SolidRoundImage 
                                borderRadius='10px'
                                imageSrc={thumbnail}
                            />
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
                            <h4>{title}</h4>
                            <p style={{color:'var(--main-lightgray2-color)'}}>{date}</p>
                        </div>

                    </div>
                        <MultiChoiceButtonGroup 
                            choice={timeIntervalChoice}
                            choices={timeIntervalChoices}
                            onChoiceChange={setTimeIntervalChoice}
                        />
                </div>
                <br></br>
                <div className={styles.totals}>
                    <TotalBox marginLeft='0px' marginRight='15px' width='220px' text='Total Views' value={arViewsCount + tdViewsCount} color='#141323' />
                    <TotalBox marginLeft='15px' marginRight='15px' width='220px' text='3D Views' value={tdViewsCount} color='#FF6F48' />
                    <TotalBox marginLeft='15px' marginRight='15px' width='220px' text='AR Views' value={arViewsCount} color='#0078FF' />
                    <TotalBox marginLeft='0px' marginRight='0px' width='220px' text='Total Shares' value={sharesCount} color='#47D27E' />
                </div>
                <br></br>
                <div className={styles.details}>
                    <div style={{ width : '530px', height : '450px', margin:'15px', marginLeft:'0px' }}>
                        <DetailBox title='Location'  data={locationData} />
                    </div>
                    <div style={{ width : '530px', height : '450px', margin:'15px', marginRight:'0px' }}>
                        <DetailBox title='Referrer Website'  data={referrerData} />
                    </div>
                </div>
            </div>
            { !statistics ? <Loading text='Loading...' />:null}
        </div>
    )
}

export default PostStatistics