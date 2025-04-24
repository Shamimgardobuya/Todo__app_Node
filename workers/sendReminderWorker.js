const { SendReminderQueue } = require('../queues/sendReminderQueue');
const { sendEmailToUser } = require('../SendEmail');
console.log('starting to run worker');

SendReminderQueue.process(async (job) => {

    const { user, task } = job.data;
    try {
        console.log('sending email')
        await sendEmailToUser(user, task);
        console.log(`Email sent to ${user.email} for task "${task.title}"`);
    } catch (error) {
        console.error(`Error sending to ${user.email}`, error);
        throw error; // triggers retry
    }
});

SendReminderQueue.on('failed', (job, err) => {
  console.error(`Job failed for ${job.data.user.email}:`, err);
});
