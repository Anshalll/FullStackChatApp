import React from 'react'
import {Helmet} from 'react-helmet-async'

const Title = ({ title = "Anshal's chat"  ,  description="Connect  , talk , and make friends only on Aanshal's Chat" }) => {

  return <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
    </Helmet>
  
}


export default Title