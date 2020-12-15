import React from 'react'
import Head from 'next/head';

import EditProfile from '../components/pages/EditProfile'
import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'

const editProfile = () => 
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Edit Profile</title>
        </Head>
        <UnauthorizedRedirect>
            <EditProfile />
        </UnauthorizedRedirect>
    </>


export default editProfile