import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import firebase from '../../../config/firebase'
import { checkProfile } from '../../../API/user'


interface IProps {
    children : any,
}

const UnauthorizedRedirect = (props : IProps) => {

    const { children } = props

    const router  = useRouter()

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async function(user) {
            console.log('redirect') 
            console.log(user);
            console.log('--------');
            
            if(!user) {
                router.push('/login')
            } else {
                if(user.uid) {
                    const checkProfileResult = await checkProfile(user.uid,user.email)
                    if(checkProfileResult.data.data.profileComplete) {
                        router.push('/profile')
                    } else {
                        router.push('/complete-profile')
                    }
                } else {
                    router.push('/login')
                }
            }
        });

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default UnauthorizedRedirect