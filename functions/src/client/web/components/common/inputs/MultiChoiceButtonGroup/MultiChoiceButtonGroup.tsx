import React from 'react'
import SolidButton from '../../buttons/SolidButton'

import styles from './MultiChoiceButtonGroup.module.css'

interface IProps {
    choices : string[]
    choice : number
    onChoiceChange : (value : number) => void
}

const MultiChoiceButtonGroup = (props : IProps) => {
    const { choices, choice, onChoiceChange } = props
    
    const renderedButtons = choices.map((txt, index) => 
        <div className={styles.buttonWrapper}>
        <SolidButton styleClass={styles.bordered} height='30px' colorTheme={index === choice?'':'white'} 
            onClick={() => onChoiceChange(index)}
        >
            <p style={{color : index === choice?'white':'var(--main-blue-color)',marginLeft:'10px',marginRight:'10px',fontSize:'x-small'}}>{txt}</p>
        </SolidButton>
    </div>)

    return (
        <div className={styles.root}>
            {renderedButtons}
        </div>
    )
}

export default MultiChoiceButtonGroup