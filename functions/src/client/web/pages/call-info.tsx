import Head from 'next/head'
import React from 'react'
import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'

import CallInfo from '../components/pages/CallInfo'

const callInfo = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Call Info</title>
        </Head>
        {/* <UnauthorizedRedirect> */}
            <CallInfo />        
        {/* </UnauthorizedRedirect> */}
    </>

export default callInfo