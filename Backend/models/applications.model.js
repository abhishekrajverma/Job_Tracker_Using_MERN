import mongoose from "mongoose";

const { Schema } = mongoose; // destructure the Schema object from mongoose 

const applicationListingSchema = new Schema({
    name: {
        type: String, 
        required: true, 
    },
    email: {
        type: String, 
        required: true, 
    },
    coverLetter: {
        type: String, 
        required: true, 
    },
    phone: {
        type: String, 
        required: true, 
    },
    address: {
        type: String, 
        required: true, 
    },
    jobId: {
        type: String, 
        required: true, 
    },
    applicantId: {
        type: String,
        required: true, 
    },
}, {
    timestamps: true // add timestamps to the schema
});

const Application = mongoose.model('Application', applicationListingSchema);

export default Application; 