import Head from 'next/head'
import React from 'react'

import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'
import Profile from '../components/pages/Profile'

const profile = () => {
    return (
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Profile</title>
        </Head>
        <UnauthorizedRedirect>
            <Profile user={null} />        
        </UnauthorizedRedirect>
    </>
)
    }
export default profile