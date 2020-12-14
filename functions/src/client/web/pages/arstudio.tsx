import React from 'react'
import Head from 'next/head'

import ARStudio from '../components/pages/ARStudio'
import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'

const arstudio = () => (
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
            <ARStudio />
        </UnauthorizedRedirect>
    </>
)

export default arstudio