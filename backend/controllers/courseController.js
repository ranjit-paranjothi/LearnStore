import Course from '../models/courseModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";
import Author from '../models/authorModel.js';


const getCourses = asyncHandler(async(req, res)=>{
    const courses = await Course.find({})
    res.json(courses);
});

const getCourseById = asyncHandler(async(req, res)=>{
    const course = await Course.findById(req.params.id);
    if(course){
        res.json(course);
    }else{
        res.status(404);
        throw new Error('Course not found');
    }
    
})

// @access Private/Admin
const deleteCourse = asyncHandler(async(req, res)=>{
    const course = await Course.findById(req.params.id);
    if(course){
        await course.remove()
        res.json({message: "Course Removed!"})
    }else{
        res.status(404);
        throw new Error('Course not found');
    }
    
})

const createCourse = asyncHandler(async(req, res)=>{
    
    const course = new Course({
        title: "Caricature Drawing",
        author: new mongoose.Types.ObjectId("615adce8464d773c639b7d29"),
        price: "200",
        user: req.user._id,
        image: "/images/generic-image-placeholder.png",
        category: "cartooning",
        description: "Learn to draw a caricature."
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
})

const updateCourse = asyncHandler(async(req, res)=>{
    const {title, author, price, description, image, category} = req.body;
    const course = await Course.findById(req.params.id);
    const authorObj = await Author.findById(author);
    if(course){
        course.title = title;
        course.author = authorObj._id;
        course.description = description;
        course.price = price;
        course.category = category;
        course.image = image;
        const updatedCourse = await course.save();
        res.status(201).json(updatedCourse);
    }else{
        res.status(404);
        throw new Error("Course Not Found!!");
    }
    
})


export {
    getCourses,
    getCourseById,
    deleteCourse,
    createCourse,
    updateCourse
}