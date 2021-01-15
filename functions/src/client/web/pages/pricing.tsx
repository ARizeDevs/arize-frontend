import Head from 'next/head'
import React from 'react'
import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'

import Pricing from '../components/pages/Pricing'
    
const pricing = () => 
    <>  
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Pricing</title>
        </Head>
        {/* <UnauthorizedRedirect> */}
            <Pricing />     
        {/* </UnauthorizedRedirect> */}
    </>

export default pricing