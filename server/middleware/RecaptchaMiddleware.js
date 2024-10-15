import {verify} from 'hcaptcha'

export const Recaptcha = async (req, res, next) => {

    const { hcaptchaToken } = req.body;

    

    try {
        const isHcaptchaValid = await verify(process.env.HCAPTCHA_SECRET , hcaptchaToken);
    


        if (!isHcaptchaValid?.success) {

            return res.status(400).json({ error: "hcaptcha verification failed" });

        } else {
           
            next()
        }
    } catch (error) {
        res.json({ error: "An error occured" })
    }
};