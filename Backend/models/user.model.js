import mongoose from 'mongoose';

const { Schema } = mongoose; // destructure the Schema object from mongoose 

// create a schema for the user model 
const contactSchema = new Schema({
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

// To use our schema definition, we need to convert our blogSchema into a Model we can work with.
//  To do so, we pass it into mongoose.model(modelName, schema):
const User = mongoose.model('User' , contactSchema);

export default User;