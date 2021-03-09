import firebase from '../config/firebase'
import Router from 'next/router'

export const getTokenID = () => {
    if (!firebase.auth().currentUser) {
        Router.push('/login')
        return
    }else {
        return (firebase.auth().currentUser as any).getIdToken(true)
    }
}

export const getUserEmail = async ():Promise< string> => 
    new Promise((resolve,reject ) => firebase.auth().onAuthStateChanged(async (user) => {
        if(!user) reject()
        else resolve(user.email as string)
    }))



export const getUserID = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(async function(user) {
            try {
                if(user) {
                    resolve(user.uid)
                } else {
                    Router.push('/login')
                    reject('no user')
                }
            } catch(error) {
                reject('no user')
            }
        })
    })
}