import firebase from 'firebase'
import React,{ useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { v4 as uuidv4 } from 'uuid';

export const UDIDContext = React.createContext({UDIDCTX : undefined, location : { lat : undefined , long : undefined}} as {UDIDCTX : undefined|string, location : { lat : undefined|string , long : undefined|string}});

interface IProps {
    children : any
}

const UniqueDeviceIdDetector = (props : IProps) => {
    const { children } = props

    const [ UDIDCTX, setUDIDCTX ] = useState(undefined as undefined|string)
    const [ location, setLocation ] = useState({ lat : undefined, long : undefined} as { lat : undefined|string, long : undefined|string })

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async function(user) {
            if(!user) {
                const cookies = new Cookies()
                let UDID = cookies.get('UDID')

                if(!UDID) {
                    UDID = uuidv4()
                    cookies.set('UDID', UDID, {
                        maxAge : 60 * 60 * 24 * 365 * 2
                    })
                }
                setUDIDCTX(UDID)

            } else {
                if(user.uid) {
                    setUDIDCTX(user.uid)
                } else {
                    const cookies = new Cookies()
                    let UDID = cookies.get('UDID')

                    if(!UDID) {
                        UDID = uuidv4()
                        cookies.set('UDID', UDID, {
                            maxAge : 60 * 60 * 24 * 365 * 2
                        })
                    }
                    setUDIDCTX(UDID)
                }
            }
        });

        if(typeof navigator !== 'undefined' && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
            function success(position) {
                setLocation({
                    lat : position.coords.latitude.toString(),
                    long : position.coords.longitude.toString()
                })
            },
            () => {});
        }

        return () => {
            unsubscribe()
        }

    })

    return (
        <UDIDContext.Provider value={{UDIDCTX,location}}>
            {children}
        </UDIDContext.Provider>
    )
}

export default UniqueDeviceIdDetector