import Head from 'next/head'
import React from 'react'

import Register from '../components/pages/Register'

const register = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Register</title>
        </Head>
        <Register />
    </>

export default register