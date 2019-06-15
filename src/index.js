const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;





// upload.single('upload'),

const errorMiddleware = (req, res, next) => {

    throw new Error('From my middleware');
    next();
}


// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     const methods = ['GET', 'PATCH', 'PUT', 'POST', 'DELETE'];

//     if(methods.includes(req.method)){
//         res.status(503).send('maintence mode')
//     } else {
//         next()
//     } 
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter)


app.listen(port, () => {

    console.log('Server is up on port ' + port);
});


// const Task = require('./db/models/task');
// const User = require('./db/models/user');

// const main = async () => {

//     // const task = await Task.findById('5cf98cd49f0f9806611ebb40');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);

//     const user = await User.findById('5cf98b5152cfb9063c863a02');
//    await user.populate('tasks').execPopulate();
//    console.log(user.tasks)


// }

// main();