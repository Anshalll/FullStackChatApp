import React from 'react'
import {Helmet} from 'react-helmet-async'

const Helmet = ({ title = "Npm package"  ,  description="npm package" }) => {

  return <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
    </Helmet>
  
}


export default Helmet