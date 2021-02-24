import React from 'react'
import Head from 'next/head'
import fetch from 'node-fetch'

import Post from '../../components/pages/Post'
import { baseURL } from '../../config/api'
import FourOhFour from '../../components/pages/FourOhFour'
import { view3DPost } from '../../API'

const post = ({ post, relatedPosts } : { post : any, relatedPosts : any}) => {
    if (!post ) {
        return <FourOhFour />
    }
    
    return (
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>{post.title}</title>
            <script type="module" src="https://unpkg.com/@google/model-viewer@1.1.0/dist/model-viewer.js"></script>
            <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
        </Head>
        <Post post={post} relatedPosts={relatedPosts} />
    </>
    )
}

export async function  getServerSideProps (context : any) {
    const id = context.params.pid
    const res = context.res

   
    try {
        await view3DPost(id)
    } catch(error) {
        console.log(error)
    }


    try {
        const result = await fetch(`${baseURL}/post/${id}?author=true`)
        const relatedPosts =  await fetch(`${baseURL}/post/${id}/related`)
        
        const jsonResult = await result.json()
        const jsonRelatedPosts = await relatedPosts.json()
        
        return {
          props: { post : jsonResult.data.data , relatedPosts:jsonRelatedPosts.data?jsonRelatedPosts.data:[]  },
        }
    } catch (error) {
        console.log(error)
        res.statusCode = 404
        return {
            props : {}
        }
    }
}

export default post