import nodemailer from 'nodemailer'

export const SendMail = (email, subject, text) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDERS_EMAIL,
            pass: process.env.SENDERS_EMAIL_PASS_KEY
        }, tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: process.env.SENDERS_EMAIL,
        to: email,
        subject: subject,
        html: `<div>
                <p class="">${text}</p>

        
        </div>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new Error("An error occured")
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}