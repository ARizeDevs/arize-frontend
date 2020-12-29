import React from 'react'
import Modal from 'react-modal';

import ErrorBoundary from '../components/common/ErrorBoundary'
import '../styles.css'
import 'cropperjs/dist/cropper.css';
import Head from 'next/head';
// import 'react-image-crop/dist/ReactCrop.css'

Modal.setAppElement('#__next')

const  MyApp = ({ Component, pageProps } : { Component:any, pageProps:any}) => 
    (<>
        <Head>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli" />
        </Head>
        <ErrorBoundary>
            <Component {...pageProps} />
        </ErrorBoundary>
    </>)

export default MyApp