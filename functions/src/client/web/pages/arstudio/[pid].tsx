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
            <UnauthorizedRedirect>
                <Head>
                    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
                    <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
                    <script
                        async
                        type="text/javascript"
                        src="https://static.sketchfab.com/api/sketchfab-viewer-1.5.1.js"
                    ></script>
                </Head>
                <ARStudio isEdit postID={pid} />
            </UnauthorizedRedirect>
        </>
    )
}

export default postStatistics