import Modal from 'react-modal'
import React, { useState } from 'react'
import CrossIcon from '../../../../assets/icons/cross.svg'
import ShareBanner from '../../../../assets/banners/share banner.svg'
import EmbedBanner from '../../../../assets/banners/embed banner.svg'

import styles from './SharePostModal.module.css'
import Input from '../inputs/Input'
import { copyToClipBoard } from '../../../helpers/copyToClipBoard'
import MultiLineInput from '../inputs/MultiLineInput'
import SolidButton from '../buttons/SolidButton';
import RoundTick from '../../../../assets/icons/round-tick.svg'

interface IProps {
    modalOpen : boolean,
    onCloseRequest : () => void,
    postID : string,
}

const SharePostModal = (props : IProps) => {
    const { modalOpen, onCloseRequest, postID } = props

    const [ timer, setTimer ] = useState<any>(null)

    const [ isEmbedPage , setIsEmbedPage ] = useState(false)
    
    const [on, setOn] = useState(false);

    const shareURL = `https://arizear.app/model-viewer/${postID}`

    const embedText = `<iframe id="inlineFrameExample"
        title=""
        width="100%"
        height="100%"
        src="https://arizear.app/model-viewer/${postID}">
    </iframe>`

    const onShareClick = async () => {
        const mobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
    
        if(mobile) {
            if(typeof window !== 'undefined' && window.navigator) {
                try {
                    await window.navigator.share({ title: "ARize", url: shareURL });
                } catch (err) {
                    console.error("Share failed:", err.message);
                }    
            }
        } else {
            copyToClipBoard(shareURL)
            setOn(true);
            if(timer) {
                clearInterval(timer)
                setTimer(setInterval(() => setOn(false),1000))

            } else {
                setTimer(setInterval(() => setOn(false),1000))
            }
        }
    }

    const onEmbedClick = () => {
        copyToClipBoard(embedText)
        setOn(true);
            if(timer) {
                clearInterval(timer)
                setTimer(setInterval(() => setOn(false),1000))

            } else {
                setTimer(setInterval(() => setOn(false),1000))
            }
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
                    <div onClick={onCloseRequest} style={{cursor:'pointer', width:'30px',marginRight:'20px',marginTop:'20px'}}>
                        <CrossIcon />
                    </div>
                </div>
                <div className={styles.bodyContainer} >
                    <div id='test' className={styles.banner}>
                        {isEmbedPage?<EmbedBanner /> : <ShareBanner />}
                    </div>
                    <div className={`${styles.column} ${styles.content}`} style={{paddingTop:'30px'}} >
                        <div className={styles.row}>
                            <h3 onClick={() => setIsEmbedPage(false)} className={`${styles.tab} ${!isEmbedPage?styles.tabActive:''}`}>Share</h3>
                            <h3 onClick={() => setIsEmbedPage(true)} className={`${styles.tab} ${isEmbedPage?styles.tabActive:''}`}>Embed</h3>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.column} style={{justifyContent:'space-evenly',width:'100%',alignItems:'flex-start'}}>
                            {!isEmbedPage?<p>Copy the link to this page and share it with others. They will be able to open the 3D view with AR integration on iOS, Android and desktop with no app required.</p>
                            :<p>Copy the code snippet below and put it on your webpage or webshop. You can control the size of it by changing the "width" and "height" elements within the code.</p>}
                            <br></br>
                            <div style={{width:'100%'}}>
                                {isEmbedPage?
                                    <MultiLineInput rows={6} text='' required={false} value={embedText} onChange={() => {}} />
                                    :<Input type='text' text={''} required={false} value={shareURL} onChange={() => {}} />}
                                <br></br>
                                <div className={styles.row} style={{width:'50%'}}>
                                    <SolidButton onClick = {isEmbedPage?onEmbedClick:onShareClick}>
                                        {isEmbedPage?
                                        <h3>Copy code</h3>
                                        : <h3>Copy link</h3>}
                                    </SolidButton>
                                    {isEmbedPage?
                                        <CopyCodeToast on={on}></CopyCodeToast>:
                                        <CopyLinkToast on={on}></CopyLinkToast>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const CopyLinkToast = ({ on } : { on : boolean}) => {
    return (
        <div className={styles.copyTextToast} style={{opacity:!on?'0':'1'}}>
            <RoundTick />
            <h5>Link copied</h5>
        </div>
    )
}

const CopyCodeToast = ({ on } : { on : boolean}) => {
    return (    
        <div className={styles.copyTextToast} style={{opacity:!on?'0':'1'}}>
            <RoundTick />
            <h5>Code copied</h5>
        </div>
    )
}

export default SharePostModal