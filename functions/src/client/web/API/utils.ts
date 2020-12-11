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

export const getUserID = () => {
    const user = firebase.auth().currentUser

    if (user) {
        return user.uid
    } else {
        Router.push('/login')
        return
    }
}