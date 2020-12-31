import Modal from 'react-modal'
import { useToasts } from 'react-toast-notifications'
import React, { useState } from 'react'

import CrossIcon from '../../../../assets/icons/cross.svg'
import ShareBanner from '../../../../assets/banners/share banner.svg'
import EmbedBanner from '../../../../assets/banners/embed banner.svg'

import styles from './SharePostModal.module.css'
import Input from '../inputs/Input'
import { copyToClipBoard } from '../../../helpers/copyToClipBoard'
import MultiLineInput from '../inputs/MultiLineInput'

interface IProps {
    modalOpen : boolean,
    onCloseRequest : () => void,
    postID : string,
}

const SharePostModal = (props : IProps) => {
    const { modalOpen, onCloseRequest, postID } = props

    const { addToast } = useToasts()

    const [ isEmbedPage , setIsEmbedPage ] = useState(false)

    const shareURL = `https://arizear.app/post/${postID}`

    const embedText = `<iframe id="inlineFrameExample"
        title=""
        width="100%"
        height="100%"
        src="https://arizear.app/model-viewer/${postID}">
    </iframe>`

    const onShareClick = () => {
        copyToClipBoard(shareURL)

        addToast('url copied',{ appearance : 'info' })
    }

    const onEmbedClick = () => {
        copyToClipBoard(embedText)

        addToast('url copied',{ appearance : 'info' })
    }


    return(
        <Modal
            isOpen={modalOpen}
            onRequestClose={onCloseRequest}
            className={styles.shareModal}
            overlayClassName={styles.overlay}
            contentLabel="Example Modal"
        >
            <div className={styles.column}>
                <div className={styles.row} style={{justifyContent:'flex-end'}}>
                    <div onClick={onCloseRequest} style={{cursor:'pointer', width:'30px',marginRight:'30px',marginTop:'10px'}}>
                        <CrossIcon />
                    </div>
                </div>
                <div className={styles.row}>
                    <div style={{width:'40%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {isEmbedPage?<EmbedBanner /> : <ShareBanner />}
                    </div>
                    <div className={styles.column} style={{width:'60%'}}>
                        <div className={styles.row}>
                            <h3 onClick={() => setIsEmbedPage(false)} className={`${styles.tab} ${!isEmbedPage?styles.tabActive:''}`}>Share</h3>
                            <h3 onClick={() => setIsEmbedPage(true)} className={`${styles.tab} ${isEmbedPage?styles.tabActive:''}`}>Embed</h3>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.column} style={{justifyContent:'space-evenly',width:'100%',alignItems:'flex-start'}}>
                            {!isEmbedPage?<p>Copy the link to this page and share it with others. They will be able to open the 3D view with AR integration on iOS, Android and desktop with no app required.</p>
                            :<p>Copy the code snippet below and put it on your webpage or webshop. You can control the size of it by changing the "width" and "height" elements within the code.</p>}
                            <div onClick={isEmbedPage?onEmbedClick:onShareClick} style={{width:'90%'}}>
                                {isEmbedPage?
                                    <MultiLineInput rows={6} text='' required={false} value={embedText} onChange={() => {}} />
                                    :<Input type='text' text={''} required={false} value={shareURL} onChange={() => {}} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SharePostModal