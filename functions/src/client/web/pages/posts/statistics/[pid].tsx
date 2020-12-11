import React from 'react'
import { useRouter } from 'next/router'

import PostStatistics from '../../../components/pages/PostStatistics'

const postStatistics = () => {
    const router = useRouter()
    const { pid } = router.query
    
    return (
        <>
       
        <PostStatistics pid={pid} />
        </>
    )
}

export default postStatistics