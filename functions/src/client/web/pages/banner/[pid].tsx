import React from 'react'
import { baseURL } from '../../config/api'

import Banner from '../../components/pages/Banner'
import FourOhFour from '../../components/pages/FourOhFour'



const banner = ({ post } : { post : any}) => {
  
  if (!post ) {
    return <FourOhFour />
  }

  if(post.hasCallToAction) {
    return (
      <Banner 
        infoText={post.actionButtonInfoText}
        buttonColor={post.actionButtonColor} 
        buttonText={post.actionButtonText}
        buttonTextColor={post.actionBUttonTextColor}
        infoBackgrounColor={post.actionInfoBackgroundColor}
        infoTextColor={post.actionButtonInfoTextColor}
        link={post.actionButtonLink}
        isAndroid={false}
        postTitle=''
      />
    )

  } else {
    return <FourOhFour />
  }
}


export async function  getServerSideProps (context : any) {
  const id = context.params.pid
  const res = context.res

  try {
    const result = await fetch(`${baseURL}/post/${id}?author=true`)
        
    const jsonResult = await result.json()
        
    return {
      props: { post : jsonResult.data.data },
    }
  } catch (error) {
    console.log(error)
    res.statusCode = 404
    return {
      props : {}
    }
  }
}

export default banner