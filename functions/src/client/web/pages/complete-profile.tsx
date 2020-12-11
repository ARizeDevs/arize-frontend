import React from 'react'

import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'
import CompleteProfile from '../components/pages/CompleteProfile'

const completeProfile = () => (
    <UnauthorizedRedirect>
        <CompleteProfile />
    </UnauthorizedRedirect>
)


export default completeProfile