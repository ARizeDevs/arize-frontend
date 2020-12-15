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
        getDirectURL(post.glbFileURL).then((url) => 
            fetch(url,{mode:"cors"})
            .then(res => res.blob())
            .then(blob => {
                let glb : string = url
                const file = new File([blob], 'test.glb', {type:'model/gltf-binary'});
                if( typeof window !== "undefined") glb = window.URL.createObjectURL(file)
                console.log(glb);
                setGLBUrl(glb)
            })
        )
        getDirectURL(post.usdzFileURL).then((url) => setUSDZUrl(url))
        getDirectURL(post.imageURL).then((url) => setPoster(url))
        if(post.backGroundImage) getDirectURL(post.backGroundImage).then((url) => setBackgrounImage(url))
    },[])
    
    return (<>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Model Viewer</title>
            <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
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