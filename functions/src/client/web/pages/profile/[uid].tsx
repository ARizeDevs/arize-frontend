import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'

// import UnauthorizedRedirect from '../../components/common/UnauthorizedRedirect'
import Profile from '../../components/pages/Profile'

const profile = () => {
    const router = useRouter()
    const { uid } = router.query
    let id = uid
    
    return <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Profile</title>
            <meta name="og:site_name" content='Arize' />
            <meta name="og:type" content='website' />
            {/* <meta name="og:title" content={post.title} />
            <meta name="og:url" content={`https://arizear.app/model-viewer/${post.id}`} />
            <meta name="og:description" content={post.author.companyName?post.author.companyName:post.author.username} />
            <meta name="og:image" content={poster} /> */}
        </Head>
        {/* <UnauthorizedRedirect> */}
            <Profile id={id as string} />        
        {/* </UnauthorizedRedirect> */}
    </>
}

export default profile