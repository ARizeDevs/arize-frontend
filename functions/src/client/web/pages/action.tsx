import React , { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RecoverPassword from '../components/pages/RecoverPassword'
import firebase from 'firebase'
import VerifyEmail from '../components/pages/VerfiyEmail'

const action = () => {
    const router = useRouter()

    const [ mode, setMode ] = useState(0)
    const [ oobCode, setOOBCode ] = useState('')

    useEffect(() => {
        const mode = router.query.mode
        const code = router.query.oobCode
        if(typeof code === typeof []) {
            setOOBCode(code[0])
        } else {
            // @ts-ignore
            setOOBCode(code)
        }
        switch (mode) {
            case 'resetPassword':
                setMode(1)
                break;
            case 'verfigyEmail':
                const auth = firebase.auth();

                auth.applyActionCode(oobCode)
                .then(() => {
                    setMode(2)
                }).catch(e => {
                    router.push('/login')
                })
                break;
            default:
                break;
        }
    })

    return (
        <>
            {mode === 1?<RecoverPassword  oobCode={oobCode} />:null}
            {mode === 2?<VerifyEmail />:null}
        </>
    )
}

export default action