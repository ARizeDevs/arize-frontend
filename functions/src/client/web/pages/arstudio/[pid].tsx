import React from 'react'
import { useRouter } from 'next/router'

import ARStudio from '../../components/pages/ARStudio'

const postStatistics = () => {
    const router = useRouter()
    const { pid } = router.query
    
    return (
        <ARStudio isEdit postID={pid} />
    )
}

export default postStatistics