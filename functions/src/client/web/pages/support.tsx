import Head from 'next/head'
import React from 'react'

import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'
import Support from '../components/pages/Support'

const support = () => (
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Support</title>
        </Head>
        <UnauthorizedRedirect>
            <Support />        
        </UnauthorizedRedirect>
    </>
)

export default support