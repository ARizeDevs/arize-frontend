import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'

import UnauthorizedRedirect from '../../components/common/UnauthorizedRedirect'
import Profile from '../../components/pages/Profile'

const profile = () => {
    const router = useRouter()
    const { uid } = router.query
    let id = uid
  
    return <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Profile</title>
        </Head>
        <UnauthorizedRedirect>
            <Profile id={id as string} />        
        </UnauthorizedRedirect>
    </>
}

export default profile