const taskRouter  = require('express').Router();
const loginMiddleware = require('../middleware/verifyToken');






const TaskController = require('../controllers/TaskController');

taskRouter.post('/create/task',loginMiddleware, TaskController.createTask);
// console.log( TaskController.insertTasks);

taskRouter.get('/get/tasks', loginMiddleware,TaskController.getUserTasks);

module.exports = taskRouter;