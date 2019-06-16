const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();



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


module.exports = app;