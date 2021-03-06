import React , { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import requestIp from 'request-ip'

// import ARizeLogo from '../../../assets/icons/logo black new.svg'

import ModelViewer from '../../components/pages/ModelViewer'
import { getPost, view3DPost } from '../../API/posts'
import { getDirectURL } from '../../config/firebase'
import FourOhFour from '../../components/pages/FourOhFour'

const modelViewer = ({ poster ,post, isAryanTer } : { poster : string, userAgent : any, ipAddress : any , post:any, isAryanTer : boolean}) => {
    const router = useRouter()
    
    if(!post) {
        return <FourOhFour />
    }
    
    useEffect(() => {
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
    const [ waterMarkImage, setWaterMarkImage] = useState('');
    const [ hasWaterMark, setHasWaterMark] = useState(false);
    const [ isOnTheWall, setIsOnTheWall] = useState(false);

    useEffect(() => {
        getDirectURL(post.glbFileURL).then((url) => setGLBUrl(url)).catch(() => '' )
        getDirectURL(post.usdzFileURL).then((url) => setUSDZUrl(url)).catch(() => '' )
        if(post.waterMarkImage){
            getDirectURL(post.waterMarkImage).then((url) => setWaterMarkImage(url)).catch(() => '')
            setHasWaterMark(true);
        }
        
        if(post.placement === "ON_THE_WALL"){
            setIsOnTheWall(true);
        }

        if(post.backGroundImage) getDirectURL(post.backGroundImage).then((url) => setBackgrounImage(url)).catch(() => '' )

    },[])
    
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/favicon.png" />
                <title>Model Viewer</title>
                {/* <script type="module" src="https://unpkg.com/@google/model-viewer@1.1.0/dist/model-viewer.js"></script> */}
                {/* <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script> */}
                <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.js"></script>
                <meta name="og:site_name" content='ARize' />
                <meta name="og:type" content='website' />
                <meta name="og:title" content={post.title} />
                <meta name="og:url" content={`https://arizear.app/model-viewer/${post.id}`} />
                <meta name="og:description" content={post.author.companyName?post.author.companyName:post.author.username} />
                <meta name="og:image" content={poster} />
            </Head>
            <div style={{position:'absolute',left:'20px',top:'20px'}}>
                {/* {hasWaterMark ?
                    <ARizeLogo/>
                :null} */}
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
                    hasWaterMark={hasWaterMark}
                    waterMarkBase64={waterMarkImage}
                    isOnTheWall={isOnTheWall}
                />
            </div>
        </>
)
}


export async function  getServerSideProps (context : any) {
    const id = context.params.pid
    const ua = context.req.headers['user-agent']
    const ipAddress =  requestIp.getClientIp(context.req)
    const referrer = context.req.headers['referer']
    

    try {
        await view3DPost(id,referrer, ua, ipAddress)
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
  
        const result = await getPost(id , true)
        
        const poster = await getDirectURL(result.data.data.imageURL)
        return {
          props: { post : result.data.data, poster },
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