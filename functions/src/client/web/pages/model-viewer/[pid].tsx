import React , { useEffect, useState } from 'react'
import Head from 'next/head'

import ModelViewer from '../../components/pages/ModelViewer'
import { getPost } from '../../API'
import { getDirectURL } from '../../config/firebase'

const arstudio = ({ post } : { post:any}) => {
    
    const [ glbURL, setGLBUrl] = useState('')
    const [ usdzURL, setUSDZUrl ] = useState('')
    const [ backGroundImage, setBackgrounImage ] = useState('')
    const [ poster, setPoster ] = useState('')

    useEffect(() => {
        getDirectURL(post.glbFileURL).then((url) => setGLBUrl(url)).catch(() => '' )
        getDirectURL(post.usdzFileURL).then((url) => setUSDZUrl(url)).catch(() => '' )
        getDirectURL(post.imageURL).then((url) => setPoster(url)).catch(() => '' )
        if(post.backGroundImage) getDirectURL(post.backGroundImage).then((url) => setBackgrounImage(url)).catch(() => '' )
    },[])
    
    return (<>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Model Viewer</title>
            <script type="module" src="https://unpkg.com/@google/model-viewer@1.1.0/dist/model-viewer.js"></script>
            <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
        </Head>
        <div style={{width:'100vw',height:'100vh'}}>
            <ModelViewer
                usdzURL={usdzURL} 
                glbURL={glbURL} 
                poster={poster}
                autoPlay={post.autoPlay}
                background={backGroundImage} 
                actionButtonText={post.actionButtonText}
                actionButtonInfoBackgroundColor={post.actionInfoBackgroundColor}
                actionButtonLink={post.actionButtonLink}
                actionButtonColor={post.actionButtonColor}
                actionButtonTextColor={post.actionBUttonTextColor}
            />
        </div>
    </>)
}


export async function  getServerSideProps (context : any) {
    const id = context.params.pid

    const result = await getPost(id , false)

    return {
      props: { post : result.data.data.data  },
    }
}

export default arstudio