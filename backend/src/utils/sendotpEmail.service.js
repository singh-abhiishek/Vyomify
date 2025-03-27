import nodemailer from "nodemailer"

// 1. Transporter create karo (SMTP server se connect hone ke liye)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_APP_PASSWORD
    }
})

// 2. Email bhejne ke liye function banao
const sendOtpToUserEmail = async (to, subject, text) => {
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

export {
    sendOtpToUserEmail
}