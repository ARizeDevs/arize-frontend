import React, { useState , useEffect } from 'react';
import classNames from 'classnames';
import styles from './ToggleSwitch.module.css'


interface IProps {
    disabled: boolean,
    toggleRightText: string,
    toggleLeftText: string,
    defaultChecked: boolean,
    className:string,
    onChange: Function

}


const ToggleSwitch = (props : IProps) => {
    const [toggle, setToggle] = useState(false);
    const { disabled,className,defaultChecked,onChange,toggleLeftText,toggleRightText} = props;

    useEffect(() => {
        if (defaultChecked) {
            setToggle(defaultChecked);
        }
    }, [defaultChecked]);

    const triggerToggle = () => {

        if ( disabled) { return; }
        setToggle( !toggle );

        if ( typeof onChange === 'function' ) {
            onChange(!toggle);
        }
    }

    const toggleClasses = classNames(styles.toggle, {
        [styles.toggleChecked2]: toggle,
        [styles.toggleDisabled]: disabled
    }, className);


    return (
        <div onClick={triggerToggle} className={toggleClasses}>
            <div className={styles.toggleContainer}>
                <div className={styles.toggleCheck}>
                    <span className={`${styles.leftSpan} ${toggle ? styles.leftSpan2 : ''}`}>{toggleLeftText}</span>
                </div>
                <div className={styles.toggleUncheck}>
                <span className={`${styles.rightSpan} ${toggle ? styles.rightSpan2 : ''}`}>{toggleRightText}</span>
                </div>
            </div>
            <div className={styles.toggleCircle}></div>
        </div>
    )
}

export default ToggleSwitch;