const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        // Transporter configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        // URL for the verification link
        const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

        // Mail options
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email, 
            subject: 'Email Verification - Complete your registration',
            text: `Thank you for registering. Please verify your email by clicking on the following link: ${verificationUrl}`,
            html: `<p>Thank you for registering.</p><p>Please verify your email by clicking on the following link:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw new Error('Could not send verification email');
    }
};

module.exports = { sendVerificationEmail };
