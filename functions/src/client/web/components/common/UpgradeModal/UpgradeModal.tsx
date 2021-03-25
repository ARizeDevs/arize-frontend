import React from 'react';
import Modal from 'react-modal';
// import { classNames } from 'react-select/src/utils';
import SolidButton from '../../common/buttons/SolidButton'

import CrossIcon from '../../../../assets/icons/cross.svg';

import styles from './UpgradeModal.module.css'

interface IProps {

    isOpen : boolean,
    onRequestClose : () => void,
    packageName: string,
    amount : string
}

const UpgradeModal = (props : IProps) => {
    const {isOpen, onRequestClose, packageName, amount} = props

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
                <h2>{packageName} - {amount}</h2>
                <p style={{textAlign:'center', paddingTop:'30px', marginLeft:'15px', marginRight:'15px'}}> You are about to upgrade your account to the {packageName} 
                and hereby authorise a monthly debit of {amount} (ex. VAT). To continue, click the blue button and leave your details.</p>
                <br></br>
                <br></br>
                <div className={styles.column} style={{width:'50%',justifyContent:'top',height:'100%'}}>
                    <SolidButton onClick={() => {
                        switch(packageName)
                        {
                            case 'Starter':
                                window.open('https://share.hsforms.com/1S1eWqiIhQn6-Ko40h5J9Uw5ahuz', '_parent')
                                break;
                            
                            case 'Pro':
                                window.open('https://share.hsforms.com/1kCOppF_eReSCcwneHlufNg5ahuz', '_parent')
                                break;

                            case 'For Enterprise':
                                window.open('https://share.hsforms.com/1epny56Q2RnuUQAjDG5oGxA5ahuz', '_parent')
                                
                                break;
                        }
                    }}> <h3>Upgrade</h3></SolidButton>
                </div>
            </div>
        </Modal>
    )

}

export default UpgradeModal;