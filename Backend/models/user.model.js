import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
    email: {
        type : String,
        required : true,
        unique : true
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
    timestamps : true
});

// To use our schema definition, we need to convert our blogSchema into a Model we can work with.
//  To do so, we pass it into mongoose.model(modelName, schema):
const User = mongoose.model('User' , contactSchema);

export default User;