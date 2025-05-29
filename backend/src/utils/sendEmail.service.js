import nodemailer from "nodemailer"

// 1. Transporter create karo (SMTP server se connect hone ke liye)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_APP_PASSWORD
    }
})

// 2. email-otp bhejne ke liye function banao
const sendOtpToUserEmail = async (to, subject, username = "user", otp) => {

    const text = `Subject: Your OTP for Account Verification

Hi ${username},

Thank you for signing up!

Your One-Time Password (OTP) is: ${otp}

This OTP is valid for 2 minutes.

Please do NOT share this OTP with anyone for security reasons.

If you did not request this, please ignore this email.

Best regards,  
${process.env.ADMIN_EMAIL}
Vyomify
`;


    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to,
        subject,
        text
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while sending otp to user email")
    }
}

const sendOtpToUserForResetPassword = async (to, subject, username = "user", otpForPasswordReset) => {
    const text = `Subject: OTP for Password Reset

Hi ${username},

We received a request to reset your password.

Your One-Time Password (OTP) is: ${otpForPasswordReset}

This OTP is valid for 2 minutes.

Please do NOT share this OTP with anyone to keep your account secure.

If you did not request a password reset, please ignore this email.

Best regards,  
${process.env.ADMIN_EMAIL}
Vyomify
`;

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to,
        subject,
        text
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while sending otp for reset password to user")
    }
}

const sendSignupDoneToUserEmail = async (to, subject, username = "user") => {
    const text = `Subject: Your Account Has Been Successfully Verified

Hi ${username},

Congratulations! Your account has been successfully verified.

You can now log in and enjoy all our services.

If you have any questions or need assistance, please feel free to contact our support team.

Thank you for joining us!

Best regards,  
${process.env.ADMIN_EMAIL}
Vyomify
`;

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to,
        subject,
        text
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while sending signupdone mail to user")
    }
}

export {
    sendOtpToUserEmail,
    sendOtpToUserForResetPassword,
    sendSignupDoneToUserEmail
}