import React from 'react'
import { Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { CheckboxProps } from '@material-ui/core/Checkbox'

import styles from './CheckBox.module.css'

const CustomCheckBox = withStyles({
    root: {
      color: 'var(--main-blue-color)',
      '&$checked': {
        color: 'var(--main-blue-color)',
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface IProps {
    isChecked : boolean,
    setIsChecked : (e : any) => void,
    text : string
}

const CheckBox =(props : IProps) => {
    const { text, isChecked, setIsChecked } = props

    return(<div className={styles.root}>
        <CustomCheckBox checked={isChecked}
            onChange={setIsChecked} /><p>{text}</p>
    </div>)
}

export default CheckBox