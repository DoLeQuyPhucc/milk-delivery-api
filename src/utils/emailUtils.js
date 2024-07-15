import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendVerificationEmail = (email, token) => {
    const url = `http://localhost:8000/api/auth/verify-email?token=${token}`;

    transporter.sendMail({
        to: email,
        subject: 'Verify your email',
        html: `Click <a href="${url}">here</a> to verify your email.`,
    });
};
