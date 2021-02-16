import Head from 'next/head'
import React from 'react'
import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'

import FeatureRequest from '../components/pages/FeatureRequest'

const featureRequest = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Request Feature</title>
        </Head>
        <UnauthorizedRedirect>
            <FeatureRequest />        
        </UnauthorizedRedirect>
    </>

export default featureRequest