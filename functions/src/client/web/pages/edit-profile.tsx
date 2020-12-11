import React from 'react'

import EditProfile from '../components/pages/EditProfile'
import UnauthorizedRedirect from '../components/common/UnauthorizedRedirect'

const editProfile = () => 
    <UnauthorizedRedirect>
        <EditProfile />
    </UnauthorizedRedirect>


export default editProfile