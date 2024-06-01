import nodemailer from "nodemailer";
import { nodemailer as nodemailerConfig } from "../../../config.json";

const { user, pass } = nodemailerConfig;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user, pass },
});

export const sendEmail = async ({ to, subject, text }) => {
    try {
        const date = new Date().toLocaleTimeString();
        const info = await transporter.sendMail({
            from: user,
            to,
            subject,
            text,
        });
        console.log(`${"=>".yellow} ${date.red} Email successfully sent to ${`${to}`.italic.blue}`.white);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        return null;
    }
};
