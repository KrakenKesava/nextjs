import nodeMailer from 'nodemailer';
import User from '@/models/userModel.js';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}:any) => {
    console.log("Preparing to send email...");
    try {
       const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            
            await User.findByIdAndUpdate(userId , {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType === "RESET"){
            
            await User.findByIdAndUpdate(userId , {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }
        console.log("Token saved to user record:", hashedToken);
        const transporter = nodeMailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e2c9a5b7951a9c",
                pass: "b9db9670c35011"
            }// add them to env

        });

        const mailOptions = {
            from: 'sriram6102004@gmail.com',
            to: email,                  
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",                  
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "RESET" ? "changepassword" : "verifyemail"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password" } </p>`
            
        }

        const mailrespones = await transporter.sendMail(mailOptions);
        console.log("Mail response:", mailrespones);
        return mailrespones;

    } catch (error:any) {
        console.log("Error sending email:", error);
    }
}