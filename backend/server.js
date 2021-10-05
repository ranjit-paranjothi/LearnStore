import path from 'path'
import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js'
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authorRoutes from './routes/authorRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, errorHandle} from "./middleware/errorHandler.js"


dotenv.config();

connectDB();

const app = express();

app.use(express.json());


app.get("/", (req, res)=>{
    res.send('API is running');
})

app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandle);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on ${PORT}`));