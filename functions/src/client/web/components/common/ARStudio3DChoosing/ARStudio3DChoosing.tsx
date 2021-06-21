import React from 'react'
import styles from './ARStudio3DChoosing.module.css'
import SolidButton from '../buttons/SolidButton'

interface IProps{
    OnLibraryChosen: () => void,
    on3DModelExist: () => void
}


const ARStudio3DChoosing = (props: IProps) => {

    const {OnLibraryChosen, on3DModelExist} = props;


    return (
        <div className={styles.root}>
            <div  className={styles.inputWrapper}>
                <p style={{fontSize:16, fontWeight:900}}> Which option describes your sutiation best? </p>
                <SolidButton styleClass={styles.borderedBTN} colorTheme='white' onClick={on3DModelExist} ><h4 style={{ color : 'var(--main-blue-color)', textAlign:'left', margin:'10px',fontSize:16 }} >I have the 3D files of my product</h4></SolidButton>
                <SolidButton styleClass={styles.borderedBTN} colorTheme='white' onClick={OnLibraryChosen} ><h4 style={{ color : 'var(--main-blue-color)', textAlign:'left', margin:'10px',fontSize:16 }} >I don't have 3D files and want to choose from ARize Library</h4></SolidButton>
                <SolidButton styleClass={styles.borderedBTN} colorTheme='white' 
                    onClick={()=>{window.open('https://share.hsforms.com/1TC1dBm9KSy2xD89PMRd6cA5ahuz','_blank')}} 
                    ><h4 style={{ color : 'var(--main-blue-color)', textAlign:'left', margin:'10px',fontSize:16 }} >I don't have 3D files and want to submit a file creation request</h4></SolidButton>
            </div>
        </div>
    )

}

export default ARStudio3DChoosing;