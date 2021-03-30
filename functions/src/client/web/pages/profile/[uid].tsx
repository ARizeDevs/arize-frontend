import Head from 'next/head'
import React from 'react'

// import UnauthorizedRedirect from '../../components/common/UnauthorizedRedirect'
import Profile from '../../components/pages/Profile'
import { getUser } from '../../API/user'
import FourOhFour from '../../components/pages/FourOhFour'

interface IProps {
    user : any
}

const profile = (props : IProps) => {
    const { user } = props
    
    if(!user) {
        return <FourOhFour />
    }

    return <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Profile</title>
            <meta name="og:site_name" content='ARize' />
            <meta name="og:type" content='website' />
            <meta name="og:title" content={user.companyName?user.companyName:user.username} />
            <meta name="og:url" content={`https://arizear.app/profile/${user.id}`} />
            <meta name="og:description" content={user.bio?user.bio:''} />
        </Head>
        {/* <UnauthorizedRedirect> */}
            <Profile user={user} />        
        {/* </UnauthorizedRedirect> */}
    </>
}

export async function  getServerSideProps (context : any) {
    const id = context.params.uid

    try {
  
        const result = await getUser(id, true, 9)
        if(result && result.data && result.data.data){
            const data = result.data.data
            
            return {
                props: { user : data },
            }
        } else {
            return {
                props : { }
            }
        }
    } catch(error) {
        console.log(error)
        return {
            props : { }
        }
    }

}


export default profile