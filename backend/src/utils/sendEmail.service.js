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
    const text = `Subject: OTP for Account Verification
                    Dear ${username},
                    Your One-Time Password (OTP) for account verification is: ${otp}.
                    This OTP is valid for 2 minutes. Please do not share it with anyone for security reasons.
                    If you did not request this OTP, please ignore this email.
                    Best regards,
                    ${process.env.ADMIN_EMAIL}`
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to,
        subject,
        text
    }
    try{
        const info = await transporter.sendMail(mailOptions);
        return info;
    }catch (error){
        throw new ApiError(500, error?.message || "Error while sending otp to user email")
    }
}

const sendOtpToUserForResetPassword = async (to, subject, username = "user", otpForPasswordReset) => {
    const text = `Subject: OTP for password reset
                    Dear ${username},
                    Your One-Time Password (OTP) for password reset is: ${otpForPasswordReset}.
                    This OTP is valid for 2 minutes. Please do not share it with anyone for security reasons.
                    If you did not request this OTP, please ignore this email.
                    Best regards,
                    ${process.env.ADMIN_EMAIL}`
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to,
        subject,
        text
    }
    try{
        const info = await transporter.sendMail(mailOptions);
        return info;
    }catch (error){
        throw new ApiError(500, error?.message || "Error while sending otp for reset password to user")
    }
}

const sendSignupDoneToUserEmail = async (to, subject, username = "user") => {
    const text = `Subject: Your Account Has Been Successfully Verified
                      Dear ${username},
                      Congratulations! Your account has been successfully verified. You can now log in and enjoy our services.
                      If you have any questions or need assistance, feel free to contact our support team.
                      Login Here: [Your Website Login URL]
                      Thank you for joining!!
                      Best regards,
                      ${process.env.ADMIN_EMAIL}
                      +91 9080706050`
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to,
        subject,
        text
    }
    try{
        const info = await transporter.sendMail(mailOptions);
        return info;
    }catch (error){
        throw new ApiError(500, error?.message || "Error while sending signupdone mail to user")
    }
}

export {
    sendOtpToUserEmail,
    sendOtpToUserForResetPassword,
    sendSignupDoneToUserEmail
}