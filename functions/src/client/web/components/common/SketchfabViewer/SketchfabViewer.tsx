// @ts-nocheck
import React, { useEffect } from 'react';

import styles from './SketchfabViewer.module.css'

interface IProps {
    link : string
}

const SketchfabViewer = (props : IProps) => {
    const { link } = props

    const loadModel = (link) => {
        
        const iframe = document.getElementById('api-iframe');
        // const check = this.props.linkCheck;
        const index = link && link.lastIndexOf('-');
        let uid = link && link.slice(index + 1);
        // if (check) {
        //   if (!link || !link.includes('sketchfab.com/3d-models/') || uid.length < 1) {
        //     uid += 'falsyURL';
        //   }
        // }
        const client = new window.Sketchfab(iframe);
        client.init(uid, {
          success: function onSuccess(api) {
            api.start();
            api.addEventListener('viewerready', () => {
              console.log('Viewer is reaqdy');
            });
          },
          error: function error() {
            console.log('viewer error');
          },
          continuousRender: 1,
        });
      };

    useEffect(() => {
        if(link != '') loadModel(link)
    } , [link])

    return (
        <div className={styles.root}>
            <p>Sketchfab Viewer</p>
            <div className={styles.viewerContainer}>
                <iframe
                    title={link}
                    width="100%"
                    height="100%"
                    src=""
                    id="api-iframe"
                    allow="autoplay; fullscreen; vr"
                    allowFullScreen={true}
                    webkitallowfullscreen="true"
                />
            </div>
        </div>
    )
}

export default SketchfabViewer
