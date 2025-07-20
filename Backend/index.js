import express from 'express'
import UploadRoute from './routes/upload.route.js'
import ViewRoute from './routes/view.route.js'
import { connectDb } from './lib/db.js';
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config();
const app=express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))

app.use('/',ViewRoute)
app.use('/api',UploadRoute )


const port=process.env.PORT

app.listen(port,()=>{
    console.log("server running on the port",port)
    connectDb();
})