import Head from 'next/head'
import React from 'react'
import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'

import ChangeEmail from '../components/pages/ChangeEmail'

const changeEmail = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Change Email</title>
        </Head>
        <UnauthorizedRedirect>
            <ChangeEmail />        
        </UnauthorizedRedirect>
    </>

export default changeEmail