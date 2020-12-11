import React from 'react'
import Modal from 'react-modal';

import ErrorBoundary from '../components/common/ErrorBoundary'
import '../styles.css'
import 'react-image-crop/dist/ReactCrop.css'

Modal.setAppElement('#__next')

const  MyApp = ({ Component, pageProps } : { Component:any, pageProps:any}) => 
    (<>
        <ErrorBoundary>
            <Component {...pageProps} />
        </ErrorBoundary>
    </>)

export default MyApp