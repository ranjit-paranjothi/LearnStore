import Author from '../models/authorModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";


const getAuthors = asyncHandler(async(req, res)=>{
    const authors = await Author.find({})
    res.json(authors);
});

const getAuthorById = asyncHandler(async(req, res)=>{
    const author = await Author.findById(req.params.id);
    if(author){
        res.json(author);
    }else{
        res.status(404);
        throw new Error('Author not found');
    }
    
})

const addAuthor = asyncHandler(async(req, res)=>{
    const {name, email} = req.body;
    

    const authorExists = await Author.findOne({email});

    console.log("authorExists::", authorExists);

    if(authorExists){
        res.status(400);
        throw Error("Author already exists");
    }

    const author = await Author.create({
        name,
        email,
        profileImage: "/images/profile_image_placeholder.jpg"
    });

    if(author){
        res.status(201).json({
            _id:author._id,
            name: author.name,
            email: author.email
        });
    }else{
        res.status(400);
        throw new Error("invalid author data");
    }

});

const updateAuthor = asyncHandler(async(req, res)=>{
    const author = await Author.findById(req.params.id);
    if(author){
        
        author.name = req.body.name || author.name;
        author.email = req.body.email || author.email;

        const updatedAuthor = await author.save();

        res.json({
            _id:updatedAuthor._id,
            name: updatedAuthor.name,
            email: updatedAuthor.email
        })

    }else{
        res.status(404);
        throw new Error("Author not Found");
    }
});

// @access Private/Admin
const deleteAuthor = asyncHandler(async(req, res)=>{
    const author = await Author.findById(req.params.id);
    if(author){
        await author.remove()
        res.json({message: "author Removed!"})
    }else{
        res.status(404);
        throw new Error('author not found');
    }
    
})



export {
    getAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor
}