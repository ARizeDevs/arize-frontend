import PropTypes from 'prop-types'

import Input from './Input'

(Input as any).propTypes = {
    text : PropTypes.string.isRequired,
    required : PropTypes.bool.isRequired,
    Icon : PropTypes.any,
    type : PropTypes.string,
    onIconClick : PropTypes.func,
    onChange : PropTypes.func,
    value : PropTypes.string
}

export default Input