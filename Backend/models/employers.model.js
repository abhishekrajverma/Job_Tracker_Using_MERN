import mongoose from "mongoose";

const { Schema } = mongoose; // destructure the Schema object from mongoose


const employerSchema = new Schema({
    email: {
        type : String, // email is a string
        required : true, // email is required
        unique : true // email should be unique 
    },
    password : {
        type : String,
        required : true
    },
    name :{
        type : String,
        required: true
    },
    avatar : {
        type : String,
        default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },

}, {
    timestamps : true // add timestamps to the schema
});

const Employer = mongoose.model('Employer' , employerSchema); // create a model from the schema 

export default Employer; // export the Employer model