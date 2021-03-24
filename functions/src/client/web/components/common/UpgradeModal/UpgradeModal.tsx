import React from 'react';
import Modal from 'react-modal';
// import { classNames } from 'react-select/src/utils';
import SolidButton from '../../common/buttons/SolidButton'

import CrossIcon from '../../../../assets/icons/cross.svg';

import styles from './UpgradeModal.module.css'
import { divide } from 'lodash';

interface IProps {

    isOpen : boolean,
    onRequestClose : () => void,
    packageName: string,
}

const UpgradeModal = (props : IProps) => {
    const {isOpen, onRequestClose, packageName } = props

    return(
        <Modal
            isOpen = {isOpen}
            onRequestClose={onRequestClose}
            className={styles.upgradeModal}
            overlayClassName={styles.overlay}
            contentLabel="Upgrade Modal"
        >
            <div style={{width:'100%', paddingTop:'10px' ,paddingRight:'30px',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                <div onClick={onRequestClose} style={{width:'30px',cursor:'pointer'}}>
                        <CrossIcon/>
                </div>
            </div>
            
            <div className={styles.column} style={{width:'100%',justifyContent:'top',alignItems:'center',height:'100%'}} >
                <h2>Upgrade to {packageName}</h2>
                <p style={{textAlign:'center', paddingTop:'30px', marginLeft:'15px', marginRight:'15px'}}> You are about to upgrade your account to the {packageName} package. 
                We will kindly ask you to fill in your billing information,  </p>
                <br></br>
                <div className={styles.column} style={{width:'50%',justifyContent:'top',height:'100%'}}>
                    <SolidButton onClick={onRequestClose}> <h3>Upgrade</h3></SolidButton>
                </div>
            </div>
        </Modal>
    )

}

export default UpgradeModal;