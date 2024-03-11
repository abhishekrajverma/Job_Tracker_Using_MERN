import JobListing from "../models/jobListing.model.js";


const createJobListing = async (req, res, next) => {
    try {
        const newJobListing = await JobListing.create(req.body);
        res.status(201).json({ message: "Jobs has been created", jobListing: newJobListing });
    } catch (error) {
        next(error);
    }
}

// export the controllers
export default { createJobListing }; 