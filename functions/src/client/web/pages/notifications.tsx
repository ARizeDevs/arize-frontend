import Head from 'next/head'
import React from 'react'

import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'
import Notifications from '../components/pages/Notifications'

const notifications = () => (
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Notifications</title>
        </Head>
        <UnauthorizedRedirect>
            <Notifications />        
        </UnauthorizedRedirect>
    </>
)

export default notifications