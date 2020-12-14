import React from 'react'
import Head from 'next/head'

import Post from '../../components/pages/Post'
import {getPost, getRelatedPosts} from '../../API'


const post = ({ post, relatedPosts } : { post : any, relatedPosts : any }) => {
    return (
    <>
        <Head>
            <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
            <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
        </Head>
        <Post post={post} relatedPosts={relatedPosts} />
    </>
    )
}

export async function  getServerSideProps (context : any) {
    const id = context.params.pid

    const result = await getPost(id , true)
    const relatedPosts = await getRelatedPosts(id)
    
    return {
      props: { post : result.data.data.data , relatedPosts:relatedPosts.data.data  },
    }
}

export default post