

const { insertTasks, getTasks } = require('../models/Tasks');


const createTask = async (req, res) => {
    console.log('Creating task:', req.body);
    const { title, description, reminder_time, user_id, completed } = req.body;
    try {
        const task = await insertTasks( title, description, reminder_time, user_id, completed );
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
}
const getUserTasks = async (req, res) => {
    const { user_id } = req.body;
    try {
        const tasks = await getTasks(user_id);
        res.status(200).json({ message: 'Tasks fetched successfully', tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
}

// const updateTask = async (req, res) => {
//     const { id } = req.params;



// }

module.exports = {    
    createTask,
    getUserTasks,
}
