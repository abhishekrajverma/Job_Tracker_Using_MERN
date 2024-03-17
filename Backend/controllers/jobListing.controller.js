import JobListing from "../models/jobListing.model.js";


const createJobListing = async (req, res, next) => {
    try {
        const newJobListing = await JobListing.create(req.body);
        res.status(201).json({ message: "Jobs has been created", jobListing: newJobListing });
    } catch (error) {
        next(error);
    }
}

// delete job listing from the database
const deleteJobListing = async (req, res, next) => {
    const listing = await JobListing.findById(req.params.id);

    if (!listing) {
        res.status(404).json({ message: "Listing not found" });
    }

    if (req.user.id !== listing.userRef) {
        res.status(401).json({ message: "You can only delete your own listings" }); 
    }

    try {
        await JobListing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
}

// export the controllers
export default { createJobListing, deleteJobListing }; 