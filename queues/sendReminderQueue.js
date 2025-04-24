const Queue = require('bull');
const SendReminderQueue = new Queue('send-reminder')

module.exports = { SendReminderQueue };
