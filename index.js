require('express')
const express = require('express');
const app = express();
const port = 5000;
const userRouter = require('./routes/userRoute');
const taskRouter = require('./routes/tasksRoute');
const route_list = require('express-list-endpoints');
var multer = require('multer');
var forms = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use()


// app.use(express.urlencoded({ extended: true }));


app.get('/routes', (req, res) => {
    res.status(200).send(route_list(app));
});

app.use('/user', forms.array(),userRouter);
app.use('/task', forms.array(), taskRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
  });













app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


