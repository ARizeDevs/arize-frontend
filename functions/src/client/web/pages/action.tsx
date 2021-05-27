import React , { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RecoverPassword from '../components/pages/RecoverPassword'
import firebase from 'firebase'
import VerifyEmail from '../components/pages/VerfiyEmail'
import Head from 'next/head'
import Loading from '../components/common/Loading'

const action = () => {
    const router = useRouter()

    const [ mode, setMode ] = useState(0)
    const [ oobCode, setOOBCode ] = useState('')

    useEffect(() => {
        const mode = router.query.mode
        let code = router.query.oobCode
        if(typeof code === typeof []) {
            code = code[0]
            setOOBCode(code[0])
        } else {
            // @ts-ignore
            setOOBCode(code)
        }
        

        switch (mode) {
            // case 'ook':
            //     firebase.auth().onAuthStateChanged(async function(user) {
            //         try {
            //             (firebase.auth().currentUser as any).sendEmailVerification()
            //         } catch(error) {

            //         }   
            //     } 

            //     break;
            case 'resetPassword':
                setMode(1)
                break;
            case 'verifyEmail':

            const auth = firebase.auth();
                
            if(code) {
                auth.applyActionCode(code as string)
                .then(() => {
                    setMode(2)
                }).catch(e => {
                    console.log(e)
                    router.push('/login')
                })
            }
                break;
            default:
                break;
        }
    } , [router.query.mode,router.query.oobCode])

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/favicon.png" />
                <title>action</title>
                {/* <script type="module" src="https://unpkg.com/@google/model-viewer@1.1.0/dist/model-viewer.js"></script> */}
                {/* <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script> */}
            </Head>
            {mode === 1?<RecoverPassword  oobCode={oobCode} />:null}
            {mode === 2?<VerifyEmail />:null}
            {mode === 0?<Loading text='Processing...' />:null}
        </>
    )
}

export default action