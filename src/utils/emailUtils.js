import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.PORT_EMAIL,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = (email, token) => {
  const url = `https://milk-delivery-api.onrender.com/api/auth/verify-email?token=${token}`;

  transporter.sendMail(
    {
      to: email,
      subject: "Verify your email",
      html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            color: #555;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .header img {
            max-width: 100px;
            margin-bottom: 10px;
        }
        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 10px;
        }
        p.welcome {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        a.verify-button {
            display: inline-block;
            background-color: #3EAEF4;
            color: white;
            padding: 12px 25px;
            margin: 20px 0;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
        }
        a.verify-button:hover {
            background-color: #45a049;
        }
        footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #777;
        }
        .footer-text {
            margin-bottom: 10px;
        }
        .footer-link {
            color: #4CAF50;
            text-decoration: none;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/milk-delivery-77769.appspot.com/o/dfb26758d8f97aa723e8.jpg?alt=media&token=506a23a9-73cc-4afa-9ecc-7051714be971" alt="Milk-Delivery Logo">
            <h1>Verify Your Email</h1>
        </div>
        <p class="welcome">Hello, welcome to Milk-Delivery</p>
        <p>Thank you for signing up. Please click the button below to verify your email address and activate your account.</p>
        <p style="text-align: center;">
            <a href="${url}" class="verify-button">Verify Email</a>
        </p>
        <footer>
            <p class="footer-text">If you did not request this email, you can safely ignore it.</p>
        </footer>
    </div>
</body>
</html>
`,
    },
    (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};

export const sendOrderConfirmationEmail = (email, token) => {
    const url = `http://localhost:${process.env.FE_PORT}/api/orders/confirm?token=${token}`;

    transporter.sendMail(
        {
            to: email,
            subject: "Confirm your order",
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            color: #555;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .header img {
            max-width: 100px;
            margin-bottom: 10px;
        }
        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 10px;
        }
        p.welcome {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        a.verify-button {
            display: inline-block;
            background-color: #3EAEF4;
            color: white;
            padding: 12px 25px;
            margin: 20px 0;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
        }
        a.verify-button:hover {
            background-color: #45a049;
        }
        footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #777;
        }
        .footer-text {
            margin-bottom: 10px;
        }
        .footer-link {
            color: #4CAF50;
            text-decoration: none;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/milk-delivery-77769.appspot.com/o/dfb26758d8f97aa723e8.jpg?alt=media&token=506a23a9-73cc-4afa-9ecc-7051714be971" alt="Milk-Delivery Logo">
            <h1>Confirm Your Order</h1>
        </div>
        <p class="welcome">Hello, welcome to Milk-Delivery</p>
        <p>Thank you for your order. Please click the button below to confirm your order and activate it.</p>
        <p style="text-align: center;">
            <a href="${url}" class="verify-button">Confirm Order</a>
        </p>
        <footer>
            <p class="footer-text">If you did not request this email, you can safely ignore it.</p>
        </footer>
    </div>
</body>
</html>
`,
        },
        (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        }
    );
};

