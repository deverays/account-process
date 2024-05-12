import nodemailer from "nodemailer";
import * as config from "../../config.json";

const date = `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;

const sendMail = ({
    to,
    subject,
    text,
}: {
    to: string;
    subject: string;
    text: string;
}) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: config.nodemailer,
    });

    transporter.sendMail(
        {
            from: config.nodemailer.user,
            to,
            subject,
            text,
        },
        (error, info) => {
            if (!error)
                return console.log(
                    "=>".yellow,
                    date.red,
                    `I successfully sent an e-mail to the e-mail address named ${to}.`
                        .white,
                    `NODEMAILER`.italic.blue
                );
        }
    );
};

export { sendMail };
