import React from 'react'
import { useRouter } from 'next/router'

import ARStudio from '../../components/pages/ARStudio'
import UnauthorizedRedirect from '../../components/common/UnauthorizedRedirect'
import Head from 'next/head'

const postStatistics = () => {
    const router = useRouter()
    const { pid } = router.query
    
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/favicon.png" />
                <title>AR studio</title>
                {/* <script type="module" src="https://unpkg.com/@google/model-viewer@1.1.0/dist/model-viewer.js"></script> */}
                <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.js"></script>
                <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
            </Head>
            <UnauthorizedRedirect>
                <ARStudio isEdit postID={pid} />
            </UnauthorizedRedirect>
        </>
    )
}

export default postStatistics