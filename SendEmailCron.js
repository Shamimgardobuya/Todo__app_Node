const cron = require('node-cron');
const db = require('./db');
var types = require('pg').types
const { SendReminderQueue } = require('./queues/sendReminderQueue');
function splitArrayTraditional(arr, chunkSize) {
    let result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        let chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}

async function sendReminderEmailJob() {
    task__count = await db('tasks').count('id');
    if (task__count[0].count <  50) {
        const tasks = await db('tasks').where(
            'reminder_time' , '>', new Date()
        ).select('id', 'title', 'description', 'reminder_time', 'user_id')
        tasks.forEach((task) => {
            db('users').where({
                id: task.user_id
            }).first().then((user) => {
                console.log('firmf');
                SendReminderQueue.add({ user, task}, {attempts: 3 })
                // transport.sendMail({from: process.env.EMAIL_FROM_ADDRESS, to:user.email, subject: 'Your task reminder is almost up',text: `Your task of ${task.title} ,with description ${task.description}, reminder_time : ${task.reminder_time}`});
            }).catch((error) => {
                console.error('Error fetching user:', error);
            });
        }).catch((error) => {
            console.error('Error fetching tasks:', error);
        });
    
    }
    // queue if records are 50 and above
    array_of_task_ids = await db('tasks').count('id');
    let val = array_of_task_ids[0].count;

    const arrayRange = (start, stop, step) =>
        Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
        );
        
    let task_ids = arrayRange(1, parseInt(val), 1);
        task_ids = splitArrayTraditional(task_ids, 50);
        console.log('task_ids',task_ids)
        task_ids.forEach((task_ids) => {
            db('tasks').where(
                'reminder_time' , '>', new Date()
            ).select('id', 'title', 'description', 'reminder_time', 'user_id')
            .whereIn('id', task_ids).then((tasks) => {
                tasks.forEach((task) => {
                    db('users').where({
                        id: task.user_id
                    }).first().then((user) => {
                        SendReminderQueue.add({ user, task}, {attempts: 3 })
                    }).catch((error) => {
                        console.error('Error fetching user:', error);
                    });
                });
            }).catch((error) => {
                console.error('Error fetching tasks:', error);
            });
        })
    
    
}
module.exports = {
    sendReminderEmailJob
}