import Head from 'next/head'
import React from 'react'

import Login from '../components/pages/Login'

const login = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Login</title>
        </Head>
        <Login />        
    </>

export default login