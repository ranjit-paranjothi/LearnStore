import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    },
    image:{
        type: String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    }

},{
    timestamps:true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;