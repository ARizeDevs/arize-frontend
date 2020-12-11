import React, {useState} from 'react'
// import DatePicker from "react-datepicker";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
// @ts-ignore
import MomentUtils from "@date-io/moment";

import styles from './DatePicker.module.css'
import { TextFieldProps } from '@material-ui/core/TextField';

interface IProps {
    value : any,
    onChange : (date : any) => void
}

const DatePickerInput = ( props : IProps ) => {
    const { value, onChange } = props

    const [ active, setActive ] = useState(false)
    const onFocus = () => setActive(true)
    const onBlur = () => setActive(false)

    const renderInput = (props: TextFieldProps): any => (
        <input
          type="text"
          className={styles.input}
          onClick={props.onClick}
          id={props.id}
          value={props.value as any}
          disabled={props.disabled}
           
          {...props.inputProps}
        />
      );

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>

            <div className={styles.container + ' flex-column'}>
                <p className={styles.label}>Day of Birth*</p>
                <div className={`${styles.secondContainer} flex-row ${active?styles.secondContainerActive:''}`}>
                    <DatePicker
                        className={'naked'}
                        style={{border:'none'}}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/DD/yyyy"
                        value={value}
                        onChange={onChange}
                        TextFieldComponent={renderInput}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </div>
            </div>
        </MuiPickersUtilsProvider>
        
    )
}

export default DatePickerInput