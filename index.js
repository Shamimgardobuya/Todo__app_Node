require('express')
const express = require('express');
const app = express();
const port = 5000;
const userRouter = require('./routes/userRoute');
const taskRouter = require('./routes/tasksRoute');
const { sendReminderEmailJob } = require('./SendEmailCron');
const cron = require('node-cron');
const route_list = require('express-list-endpoints');
var multer = require('multer');
var forms = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/routes', (req, res) => {
    res.status(200).send(route_list(app));
});

app.use('/user', forms.array(),userRouter);
app.use('/task', forms.array(), taskRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
  });
// Schedule the job to run every 30 minute
cron.schedule('30 * * * *', ()=> {
    console.log('Running SendReminderEmailJob');
    sendReminderEmailJob();
}) 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


