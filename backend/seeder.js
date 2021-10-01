import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import courses from './data/courses.js';
import authors from './data/authors.js'
import User from './models/userModel.js';
import Course from './models/courseModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import Author from './models/authorModel.js';

dotenv.config();

connectDB();

const importData = async ()=>{
    try{
        await Author.deleteMany();
        await Order.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        const createAuthors = await Author.insertMany(authors);
        const creatUsers = await User.insertMany(users);

        const adminUser = creatUsers[0]._id;
        const defaultAuthor = createAuthors[0]._id

        const sampleCourses = courses.map(course => ({ ...course, author:defaultAuthor, user:adminUser}));
        
        await Course.insertMany(sampleCourses);
        console.log("DATA IMPORTED!");
    } catch(error){
        console.error(error);
        process.exit(1);
    }
};

const removeData = async ()=>{
    try{
        await Author.deleteMany();
        await Order.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        
        console.log("DATA REMOVED!");
    } catch(error){
        console.error(error);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    removeData();
}else{
    importData();
}