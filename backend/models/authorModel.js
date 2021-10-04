import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImage:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

const Author = mongoose.model('Author', authorSchema);

export default Author;