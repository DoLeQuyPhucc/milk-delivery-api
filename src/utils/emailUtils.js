import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.PORT_EMAIL,
    secure: false, // Chỉ cần đặt secure thành true nếu bạn sử dụng cổng 465
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendVerificationEmail = (email, token) => {
    const url = `http://localhost:${process.env.PORT}/api/auth/verify-email?token=${token}`;

    transporter.sendMail({
        to: email,
        subject: 'Verify your email',
        html: `Click <a href="${url}">here</a> to verify your email.`,
    }, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};
