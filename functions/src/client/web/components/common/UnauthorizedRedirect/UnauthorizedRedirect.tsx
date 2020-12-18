import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import firebase, { db } from '../../../config/firebase'


interface IProps {
    children : any,
    onlyBusiness? : boolean,
    onlyBusinessReroute? : string ,
    onlyIndividual? : boolean,
    onlyIndividualReroute? : string
}

const UnauthorizedRedirect = (props : IProps) => {

    const { children, onlyBusiness, onlyBusinessReroute, onlyIndividual, onlyIndividualReroute } = props

    const router  = useRouter()

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async function(user) {
            console.log(user)
            if(!user) {
                router.push('/login')
            } else {
                if(user.uid) {
                    console.log(user.uid)
                    console.log('email verified',user.emailVerified)
                    const userData : any = await db.collection('users').doc(user.uid).get()
                        console.log(userData.data())
                        if(userData.exists) {
                            console.log(userData.exist)
                            if (!userData.data().name) {
                                router.push('/complete-profile')
                            } else {
                                if(onlyBusiness) {
                                    if(userData.data().type !== 'BUSINESS') {
                                            router.push(onlyBusinessReroute as string)
                                    }
                                } else {
                                    if(onlyIndividual) {
                                        if(userData.data().type !== 'INDIVIDUAL') {
                                            router.push(onlyIndividualReroute as string)
                                        }   
                                    }
                                }
                            } 
                        } else {
                            router.push('/login')
                        }
                    // }).catch((error) => console.log(error))
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