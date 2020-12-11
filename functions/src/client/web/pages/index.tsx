import React from 'react'

import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'
import Profile from '../components/pages/Profile'

const profile = () => (
    <UnauthorizedRedirect>
        <Profile />        
    </UnauthorizedRedirect>
)

export default profile