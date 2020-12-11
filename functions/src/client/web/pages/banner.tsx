import React from 'react'

import Banner from '../components/pages/Banner'



const banner = ({ query } : { query : any}) => <Banner 
    buttonColor={query.buttonColor} 
    buttonText={query.buttonText}
    buttonTextColor={query.buttonTextColor}
    infoBackgrounColor={query.infoBackgrounColor}
    link={query.link}
    />


banner.getInitialProps = ({ query } : { query : any}) => {
    return {query}
  }

export default banner