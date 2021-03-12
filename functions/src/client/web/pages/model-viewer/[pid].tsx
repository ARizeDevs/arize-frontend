import React , { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import requestIp from 'request-ip'

import ARizeLogo from '../../../assets/icons/logo black new.svg'

import ModelViewer from '../../components/pages/ModelViewer'
import { getPost, view3DPost } from '../../API/posts'
import { getDirectURL } from '../../config/firebase'
import FourOhFour from '../../components/pages/FourOhFour'

const modelViewer = ({ post, isAryanTer } : { userAgent : any, ipAddress : any , post:any, isAryanTer : boolean}) => {
    const router = useRouter()
    
    if(!post) {
        return <FourOhFour />
    }
    
    useEffect(() => {
        console.log(router.query)
        if(router.query){
            if(router.query['openar']) {
                setOpenar(true)
            }
        }
        if(isAryanTer) {
            router.push("https://arize.io/samples/webar/furniture/ar.html")
        }
    }, [])

    const [ openar, setOpenar ] = useState(false)
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
                    shadowSoftness={post.shadowSoftness}
                    hasShadow={post.hasShadow}
                    shadowIntensity={post.shadowIntensity}
                    exposure={post.exposure}
                    hasARButton={post.hasARButton}
                    arButtonTextColor={post.arButtonTextColor}
                    arButtonBackgroundColor={post.arButtonBackgroundColor}
                    hasShareButton={post.hasShareButton}
                    shareButtonBackgroundColor={post.shareButtonBackgroundColor}
                    shareButtonTextColor={post.shareButtonTextColor}
                    solidBackgroundColor={post.solidBackgroundColor}
                    openar={openar}
                    showQR={true}
                    title={post.title}
                    allowScaling={post.allowScaling}
                    showShare={true}
                    id={post.id}
                    usdzURL={usdzURL} 
                    glbURL={glbURL} 
                    poster={poster}
                    autoPlay={post.autoPlay}
                    backgroundImage={backGroundImage} 
                />
            </div>
        </>
)
}


export async function  getServerSideProps (context : any) {
    const id = context.params.pid
    const ua = context.req.headers['user-agent']
    const ipAddress =  requestIp.getClientIp(context.req)


    try {
        await view3DPost(id, ua, ipAddress)
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

export default modelViewer