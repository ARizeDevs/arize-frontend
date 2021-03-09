import Head from 'next/head'
import React from 'react'

import CallInfo from '../components/pages/CallInfo'

const callInfo = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Call Info</title>
        </Head>
        <CallInfo />        
    </>

export default callInfo