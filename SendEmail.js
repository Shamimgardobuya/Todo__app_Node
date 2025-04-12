const nodemailer = require("nodemailer");
require('dotenv')

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "038d59538b17cb",
      pass: "a0135d3e1cc36a"
    }
  });


// const mailOptions = {
//     from: process.env.EMAIL_FROM_ADDRESS,
//     to: user_email,
//     subject: 'Task Reminder Time',
//     text: 'Your task reminder time is almost up.'. edit ,
//   };


module.exports = transport;
// transport.sendMail({}, (error, info) => {
//     if (error) {
//     console.error('Error occurred:', error);
//     } else {
//     console.log('Email sent successfully:', info.response);
//     }
//  });
