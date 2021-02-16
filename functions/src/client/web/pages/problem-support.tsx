import Head from 'next/head'
import React from 'react'
import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'

import ProblemSupport from '../components/pages/ProblemSupport'

const problemSupport = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Problems Support</title>
        </Head>
        <UnauthorizedRedirect>
            <ProblemSupport />        
        </UnauthorizedRedirect>
    </>

export default problemSupport