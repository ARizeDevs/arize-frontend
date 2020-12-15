import Head from 'next/head'
import React from 'react'

import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'
import Profile from '../components/pages/Profile'

const home = () => (
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Home</title>
        </Head>
        <UnauthorizedRedirect>
            <Profile />        
        </UnauthorizedRedirect>
    </>
)

export default home