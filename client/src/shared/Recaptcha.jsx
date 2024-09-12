import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

export default function Recaptcha({ recaptchaRef  , setRecaptchaVal , setrecaptchaToken , setError}) {


    const handleVerificationSuccess = (token) => {
  
        if (token) {

            setRecaptchaVal(true)    
            setrecaptchaToken(token)

        }


        
    }


    const handleError = (error) => {
            recaptchaRef.current.resetCaptcha()
            setError(error)
    }

    return (
        <div>

            <HCaptcha

                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
                onVerify={(token) => handleVerificationSuccess(token)}
                onExpire={() => handleError("captcha expired!") }
                onError={() => handleError("captcha verification failed!")}
            />

        </div>
    )
}
