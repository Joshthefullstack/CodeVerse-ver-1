const nodemailer = require("nodemailer");
import dotenv from 'dotenv';
import { RespInfo } from '../utils/RespInfo';
const randomString = require('randomstring')

dotenv.config();


const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "api",
    pass: process.env.MAILTRAP_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"ibiamjoshua20@gmail.com', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);

// const otpCache : OtpCache = {};

const otpCach = new Map<string, string>();

function saveOtp(email: string, otp: string) {
  otpCach.set(email, otp);

  // Set a timer to auto-delete after 5 minutes
  setTimeout(() => {
    otpCach.delete(email);
    console.log(`OTP for ${email} has expired and been removed.`);
  }, 2 * 60 * 1000);
}

function generateOtp()
{
    return randomString.generate({ length: 4, charset: 'numeric'});
}

export function sendOtp(email : string)
{
  const otp = generateOtp();
    const mailOptions = {
        from: 'ibiamjoshua20@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: 'Ýour OTP for verification is' + otp
    }

    const transporter = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "api",
          pass: process.env.MAILTRAP_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
      });

      transporter.sendMail(mailOptions, (error : Object, info : Object) => {
        if(error)
        {
            console.log('Error occured while sending email: ', error);
        } else{
            saveOtp(email, otp)
            console.log('OTP Email sent successfully', info)
        }
      })
}

export function verifyOtp(email : string, otp : string) : RespInfo
{
    if(!otpCach.has(email))
    {
        return new RespInfo(['Invalid Email', 'Email not found, please input a registered email'], false, null);
    }

    if(otpCach.get(email) === otp.trim())
    {
        otpCach.delete(email);
        return new RespInfo(['Verification Successful, OTP Verified Sucessfully'], true, email);
    } else{
        return new RespInfo(['Verification UnSuccessful, Invalid OTP'], true, email);
    }
}