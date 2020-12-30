import React from 'react'
import QRCode from 'qrcode.react'
import Modal from 'react-modal'

import CrossIcon from '../../../../assets/icons/cross.svg'

import styles from './QRModal.module.css'

interface IProps {
    isOpen : boolean,
    onRequestClose : () => void,
    url : string,
    text : string
}

const QRModal = (props : IProps) => {
    const { isOpen, onRequestClose, text, url, } = props

    return(
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onRequestClose}
            className={styles.qrModal}
            overlayClassName={styles.overlay}
            contentLabel="Example Modal"
        >
            <div className={styles.column} style={{width:'100%',justifyContent:'center',alignItems:'center',height:'100%'}} >
                <div style={{width:'100%',paddingLeft:'30px'}}>
                    <button onClick={onRequestClose} style={{border:'none',backgroundColor:'var(--main-blue-color)',color:'white',borderRadius:'50%',width:'30px',height:'30px',outline:'none',cursor:'pointer'}}>
                        {/* @ts-ignore */}
                        <CrossIcon fill='white' />
                    </button>
                    </div>
                <QRCode value={url} />
                <br></br>
                <p className={styles.grayColor}>{text}</p>
            </div>
        </Modal>
    )
}

export default QRModal