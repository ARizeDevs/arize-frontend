/* @ts-nocheck */
import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { ToastProvider } from 'react-toast-notifications'

import Toast from '../components/common/Toast'

import ErrorBoundary from '../components/common/ErrorBoundary'
import '../styles.css'
import 'cropperjs/dist/cropper.css';
import Head from 'next/head';
import {hotjar} from 'react-hotjar';
// import UniqueDeviceIdDetector from '../components/common/UniqueDeviceIdDetector';
// import 'react-image-crop/dist/ReactCrop.css'


Modal.setAppElement('#__next')

const  MyApp = ({ Component, pageProps } : { Component:any, pageProps:any}) => {

    useEffect(()=> {

        if(typeof window !== 'undefined') hotjar.initialize(2369194,6);

    },[typeof window !== 'undefined'? window:null])

    return  (<>
        <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli" />
        </Head>
        <ErrorBoundary>
            {/* <UniqueDeviceIdDetector> */}
                {/* @ts-ignore */}
                <ToastProvider  transitionDuration={900} autoDismiss autoDismissTimeout={3000} components={{ Toast }}>
                    <Component {...pageProps} />
                </ToastProvider>
            {/* </UniqueDeviceIdDetector> */}
        </ErrorBoundary>
    </>)
}

export default MyApp