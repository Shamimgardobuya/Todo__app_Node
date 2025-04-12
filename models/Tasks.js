// const knex = require('knex');
// const db = knex(require('../knexfile').development);
const db = require('../db');
const { insertUsers, getUsers } = require('../models/Users');
// console.log(db);
const insertTasks = async (title, description, reminder_time, user_id, completed) => {
    try {
        // user = await db('users').where({ id: user_id }).first();
        // if (!user) {
        //     throw new Error('User not found');
        // }
        let task = await db('tasks').insert(
            {
                title : title,
                description : description,
                reminder_time : reminder_time,
                user_id : user_id,
                completed : completed,

            }
        ) 
        return task;
        
    } catch (error) {
        console.error('Error inserting task:', error);
        throw error;
        
    }
}

const getTasks = async (user_id) => {
    try {
        let tasks = await db('tasks').where(
            {
                user_id : user_id
            }).select('title', 'description', 'reminder_time', 'user_id', 'completed')   

        
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
        
    }
}

module.exports = {
    insertTasks,
    getTasks
}