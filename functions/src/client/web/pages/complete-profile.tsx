import Head from 'next/head'
import React from 'react'

import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'
import CompleteProfile from '../components/pages/CompleteProfile'

const completeProfile = () => (
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Complete Profile</title>
        </Head>
        <UnauthorizedRedirect>
            <CompleteProfile />
        </UnauthorizedRedirect>
    </>
)


export default completeProfile