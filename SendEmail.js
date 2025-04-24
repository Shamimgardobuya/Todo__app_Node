const nodemailer = require("nodemailer");
require('dotenv')

var transport = nodemailer.createTransport({ //using mailhog
  host: 'localhost',
  port: 1025,
  secure: false, 
  });



  const sendEmailToUser = async (user, task) => {
    return await transport.sendMail({
      from: process.env.EMAIL_FROM_ADDRESS,
      to: user.email,
      subject: 'Task Reminder',
      text: `Your task "${task.title}" is due: ${task.description} at ${task.reminder_time}`
    });
  };
  


module.exports = { sendEmailToUser };

