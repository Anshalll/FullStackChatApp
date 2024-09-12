import { GenerateOtp, GenerateResetPassUrl } from "./GenerateVals.js";
import {SendMail} from './SendMail.js'
import {HtmlOtp , HTMLresetpass} from '../shared/EmailHhtml.js'

export default function MailedData(db, email, type, error) {
    this.db = db;
    this.email = email;
    this.error = error;
    this.type = type;
}

MailedData.prototype.mainFunc = async function () {

    const checkData = await this.db.find({ email: this.email });
    const time = new Date();

    if (checkData.length === 0) {

        const val = this.type === "otp" ? GenerateOtp(5) : await GenerateResetPassUrl(this.email);
        await this.db.create({ email: this.email, value: val, time: time.getTime() });
        
        await SendMail(this.email , this.type === "otp" ? `${process.env.SITE_NAME} registration otp` : `${process.env.SITE_NAME} password reset` ,  this.type === "otp" ? HtmlOtp(val) : HTMLresetpass(val))

    } else if (checkData.length > 0 && checkData.length < 3) {

        const val = checkData[0].value;
        await this.db.create({ email: this.email, value: val, time: time.getTime() });
        await SendMail(this.email , this.type === "otp" ? `${process.env.SITE_NAME} registration otp` : `${process.env.SITE_NAME} password reset` ,  this.type === "otp" ? HtmlOtp(val) : HTMLresetpass(val))

    } else {

        if (this.error) {
            throw new Error(this.error);
        }
        
    }
};
