import React from 'react';
import Modal from 'react-modal';
// import { classNames } from 'react-select/src/utils';

import CrossIcon from '../../../../assets/icons/cross.svg';

import styles from './UpgradeModal.module.css'

interface IProps {

    isOpen : boolean,
    onRequestClose : () => void,
    text : string,
    packageName: string,
}

const UpgradeModal = (props : IProps) => {
    const {isOpen, onRequestClose, text} = props

    return(
        <Modal
            isOpen = {isOpen}
            onRequestClose={onRequestClose}
            className={styles.upgradeModal}
            overlayClassName={styles.overlay}
            contentLabel="Upgrade Modal"
        >
            <div className={styles.column} style={{width:'100%',justifyContent:'center',alignItems:'center',height:'100%'}} >
                <div style={{width:'100%',paddingRight:'30px',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                    <div onClick={onRequestClose} style={{width:'30px',cursor:'pointer'}}>
                        <CrossIcon />
                    </div>
                </div>
                <br></br>
                <p>{text}</p>
            </div>
        </Modal>
    )

}

export default UpgradeModal;