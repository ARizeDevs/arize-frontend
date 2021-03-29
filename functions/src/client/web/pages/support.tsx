import Head from 'next/head'
import React from 'react'

import Support from '../components/pages/Support'

const support = () => (
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Support</title>
            <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/8887787.js"></script>
        </Head>
        {/* <UnauthorizedRedirect> */}
            <Support />        
        {/* </UnauthorizedRedirect> */}
    </>
)

export default support