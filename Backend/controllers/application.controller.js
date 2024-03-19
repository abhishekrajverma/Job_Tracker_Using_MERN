import Application from "../models/applications.model.js"; // import the Application model from the models folder

const createApplication = async (req, res, next) => {
    try {
        const newApplication = await Application.create(req.body);
        res.status(201).json({ message: "Application has been created", application: newApplication });
    } catch (error) {
        next(error);
    }
}

// get all applications
const getAllApplications = async (req, res, next) => {
    const applications = await Application.find({ jobId: req.params.id });
    try {
        if (!applications) {
            return res.status(404).json({ message: "No applications found" });
        }
        res.status(200).json({message: "Applications found", applications});
    } catch (error) {
        next(error);
    }
}

export default { createApplication, getAllApplications }; // export the createApplication function