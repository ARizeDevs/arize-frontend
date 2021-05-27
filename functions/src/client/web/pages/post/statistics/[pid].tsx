import React, { useEffect, useState } from 'react'

import PostStatistics from '../../../components/pages/PostStatistics'
import { getStatistics } from '../../../API/posts'
import FourOhFour from '../../../components/pages/FourOhFour'
import { getDirectURL } from '../../../config/firebase'

const postStatistics = ({ id } : { id : any }) => {
    
    const [ statistics, setStatistics ] = useState(null)
    const [ thumbnail, setThumbnail ] = useState('')
    const [ title, setTitle] = useState('')
    const [ date, setDate] = useState('')

    useEffect(() => {
        const getData = async () => {
            try {
                const statisticsResult = await getStatistics(id)
                console.log(statisticsResult);
                
                setStatistics(statisticsResult.data.data.statistics)
                getDirectURL(statisticsResult.data.data.thumbnail).then((url) => setThumbnail(url))
                    .catch((error) => console.log(error))
                setTitle(statisticsResult.data.data.title)
                setDate(new Date(statisticsResult.data.data.date).toDateString())
            } catch(error) {
                console.log(error);
            }
        }

        getData()
    }, [ id ])

    if(!id) {
        return <FourOhFour />
    }

    return (
        <>
            <PostStatistics title={title} date={date} thumbnail={thumbnail} statistics={statistics} />
        </>
    )
}

export async function  getServerSideProps (context : any) {
    const id = context.params.pid

    try {  
        
        return {
          props: { id  },
        }
    } catch(error) {
        console.log(error)
        return {
            props : {}
        }
    }

}

export default postStatistics