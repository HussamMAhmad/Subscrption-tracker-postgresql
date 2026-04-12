import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

export const myEmail = "nirolive134@gmail.com";

let transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user: myEmail , 
        pass: EMAIL_PASSWORD
    }
})

export default transporter;