import mongoose from "mongoose";

const { Schema } = mongoose; // destructure the Schema object from mongoose 

const jobListingSchema = new Schema({
    title: {
        type: String, // title is a string
        required: true, // title is required
    },
    description: {
        type: String, // description is a string
        required: true, // description is required
    },
    location: {
        type: String, // location is a string
        required: true, // location is required
    },
    salary: {
        type: String, // salary is a string
        required: true, // salary is required
    },
    company: {
        type: String, // company is a string
        required: true, // company is required
    },
    jobType: {
        type: String, // jobType is a string
        required: true, // jobType is required
    },
    experience: {
        type: String, // experience is a string
        required: true, // experience is required
    },
    skills: {
        type: String, // skills is an array of strings
        required: true, // skills is required
    },
    userRef: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // add timestamps to the schema
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

export default JobListing; // export the JobListing model