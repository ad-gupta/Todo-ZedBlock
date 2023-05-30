import express from 'express';
import mongoose from 'mongoose';
import {config} from 'dotenv';
import cors from 'cors'
import userRoute from './routes/user.js';
import taskRoute from './routes/task.js';
import cookieParser from 'cookie-parser';

const app = express();

config();
const connect = () => {
    mongoose.connect(process.env.MONGOOSE_URI, {dbName: "ToDo"}).then(()=> {
        console.log("Connected to DB")
    }).catch((err) => {console.log(err)})
}

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRoute);
app.use('/api/tasks', taskRoute);
app.use((err, req, resp, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return resp.status(status).json({success: false, status, message})

})

const port = process.env.PORT;
app.get('/', (req, resp) => {
    resp.send("hello")
})

app.listen(8000, ()=> {
    console.log(`Server running on ${port}`)
    connect();
})