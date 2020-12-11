import PropTypes from 'prop-types'

import SolidButton from './SolidButton'
 
(SolidButton as any).propTypes = {
    text : PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default SolidButton