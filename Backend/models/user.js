const mongoose = require('mongoose');

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
    }

}, {
    timestamps : true
});

// To use our schema definition, we need to convert our blogSchema into a Model we can work with.
//  To do so, we pass it into mongoose.model(modelName, schema):
const User = mongoose.model('User' , contactSchema);

module.exports = User;