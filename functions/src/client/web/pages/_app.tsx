import React from 'react'
import Modal from 'react-modal';
import { ToastProvider } from 'react-toast-notifications'

import Toast from '../components/common/Toast'

import ErrorBoundary from '../components/common/ErrorBoundary'
import '../styles.css'
import 'cropperjs/dist/cropper.css';
import Head from 'next/head';
import UniqueDeviceIdDetector from '../components/common/UniqueDeviceIdDetector';
// import 'react-image-crop/dist/ReactCrop.css'

Modal.setAppElement('#__next')

const  MyApp = ({ Component, pageProps } : { Component:any, pageProps:any}) => {
    if(typeof window !== "undefined") {
        // @ts-ignore
        window.session = {
            options: { gapi_location: true },
            start: function(session){ // can also use window.session global.
            if (session.first_session.visits > 1){
                alert('Hi again from ' + session.location.address.city);
            } else {
                if (session.contains(session.current_session.referrer_info.host, 'facebook')){
                alert('Hi there from '+ session.location.address.city +'. How about liking us on facebook?');
                } else if (session.current_session.search.engine){
                alert('Did you find what you were looking for from ' + session.current_session.search.engine + '?');
                }
            }
            }
        }
    }
    
    return  (<>
        <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <script src="http://codejoust.github.com/session.js/session-0.4.js" />
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli" />
        </Head>
        <ErrorBoundary>
            <UniqueDeviceIdDetector>
                {/* @ts-ignore */}
                <ToastProvider  transitionDuration={900} autoDismiss autoDismissTimeout={3000} components={{ Toast }}>
                    <Component {...pageProps} />
                </ToastProvider>
            </UniqueDeviceIdDetector>
        </ErrorBoundary>
    </>)
}

export default MyApp