import React , { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'


import ARizeLogo from '../../../assets/icons/logo black new.svg'

import ModelViewer from '../../components/pages/ModelViewer'
import { getPost, view3DPost } from '../../API'
import { getDirectURL } from '../../config/firebase'
import FourOhFour from '../../components/pages/FourOhFour'
import createUniqueDeviceID from '../../helpers/createUniqueDeviceID'

const arstudio = ({ post, isAryanTer } : { userAgent : any, ipAddress : any , post:any, isAryanTer : boolean}) => {
    const router = useRouter()
    

    if(!post) {
        return <FourOhFour />
    }



    useEffect(() => {
        if(isAryanTer) {
            router.push("https://arize.io/samples/webar/furniture/ar.html")
        }
    }, [])


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
    
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/favicon.png" />
                <title>Model Viewer</title>
                <script type="module" src="https://unpkg.com/@google/model-viewer@1.1.0/dist/model-viewer.js"></script>
                <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
            </Head>
            <div style={{position:'absolute',left:'20px',top:'20px'}}>
                <ARizeLogo />
            </div>
            <div style={{width:'100vw',height:'100vh'}}>
                <ModelViewer
                    showQR={true}
                    title={post.title}
                    arScale={post.arScale}
                    showShare={true}
                    actionButtonInfoText={post.actionButtonInfoText}
                    id={post.id}
                    usdzURL={usdzURL} 
                    glbURL={glbURL} 
                    poster={poster}
                    autoPlay={post.autoPlay}
                    background={backGroundImage} 
                    hasCallToAction={post.hasCallToAction}
                    actionButtonText={post.actionButtonText}
                    actionButtonInfoTextColor={post.actionButtonInfoTextColor}
                    actionButtonInfoBackgroundColor={post.actionInfoBackgroundColor}
                    actionButtonLink={post.actionButtonLink}
                    actionButtonColor={post.actionButtonColor}
                    actionButtonTextColor={post.actionBUttonTextColor}
                />
            </div>
        </>
)
}


export async function  getServerSideProps (context : any) {
    const id = context.params.pid

    try {
        const deviceID = await createUniqueDeviceID(context.req)
    

        if(deviceID) {
            await view3DPost(deviceID, { lat : '10', long : '10'},id)
        }
    
    } catch(error) {
        console.log(error)
    }

    try {
    
        if(id === "uiQAUkPHPDZkmCGWEtr7tal6LfT21608060453904")
        {
            return {
                props: { isAryanTer:true}
            }
        }
  
        const result = await getPost(id , false)
        
        return {
          props: { post : result.data.data.data },
        }
    } catch(error) {
        console.log('=======')
        console.log(error)
        console.log('=======')
        return {
            props : {}
        }
    }

}

export default arstudio