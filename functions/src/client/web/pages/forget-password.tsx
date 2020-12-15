import Head from 'next/head'
import React from 'react'

import ForgetPassword from '../components/pages/ForgetPassword'

const forgetPassword = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Forgot Password</title>
        </Head>
        <ForgetPassword />        
    </>

export default forgetPassword