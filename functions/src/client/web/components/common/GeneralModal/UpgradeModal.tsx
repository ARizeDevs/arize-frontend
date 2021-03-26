import React from 'react';
import Modal from 'react-modal';
// import { classNames } from 'react-select/src/utils';
import SolidButton from '../buttons/SolidButton'

import CrossIcon from '../../../../assets/icons/cross.svg';
import ErrorTriangle from '../../../../assets/icons/error-triangle.svg'
import SuccessSign from '../../../../assets/icons/success-sign.svg'
import InfoIcon from '../../../../assets/icons/exclamation.svg'
import StarredIcon from '../../../../assets/icons/starred.svg'


import styles from './UpgradeModal.module.css'
import { IMessageTypes } from '../Message/Message';

interface IProps {
    isOpen : boolean,
    onRequestClose : () => void,
    title: string,
    onClick : () => void,
    buttonText : string,
    type : IMessageTypes,
    description : string
}

const UpgradeModal = (props : IProps) => {
    const {isOpen, onRequestClose, title, description, buttonText, onClick, type} = props

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
                <div className={styles.row}>
                    {type === IMessageTypes.ERROR? <ErrorTriangle />:null}
                    {type === IMessageTypes.SUCCESS? <SuccessSign />:null}
                    {type === IMessageTypes.ACTIVE? <SuccessSign />:null}
                    {type === IMessageTypes.INFO? <InfoIcon />:null}
                    {type === IMessageTypes.STARRED? <StarredIcon/>:null}
                    &nbsp;&nbsp;
                    <h2>{title}</h2>
                </div>
                
                <p style={{textAlign:'center', paddingTop:'30px', marginLeft:'15px', marginRight:'15px'}}>{description}</p>
                <br></br>
                <br></br>
                <div className={styles.column} style={{width:'50%',justifyContent:'top',height:'100%'}}>
                    <SolidButton onClick={onClick}> <h3>{buttonText}</h3></SolidButton>
                </div>
            </div>
        </Modal>
    )

}

export default UpgradeModal;