export const HtmlOtp = (otp) => {
    return `<div>
        <p>Your account registration OTP is
        <span style="font-weight: bold; color: black;">
        ${otp}
        </span>
        </p>
        <i>Do not share this OTP with anyone.</i>
    </div>`;
}

export const HTMLresetpass = (link) => {

    return `<div>
        <p>Reset your password here:</p>
        <a href="${link}" style="background-color: crimson; text-decoration: none; color: white; padding: 10px 40px; border-radius: 5px;">Reset password</a>
    </div>`;
}
