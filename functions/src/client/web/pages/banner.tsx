import React from 'react'

import Banner from '../components/pages/Banner'



const banner = ({ query } : { query : any}) => <Banner 
    infoText={query.infoText}
    buttonColor={query.buttonColor} 
    buttonText={query.buttonText}
    buttonTextColor={query.buttonTextColor}
    infoBackgrounColor={query.infoBackgrounColor}
    link={query.link}
    isAndroid={false}
    postTitle=''
    />


banner.getInitialProps = ({ query } : { query : any}) => {
    return {query}
  }

export default banner