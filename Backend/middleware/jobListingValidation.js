import { validationResult, check } from "express-validator";

const validateJobListing = [
    // Validation rules for each field
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("location").notEmpty().withMessage("Location is required"),
    check("salary").notEmpty().withMessage("Salary must be a number"),
    check("company").notEmpty().withMessage("Company is required"),
    check("jobType").notEmpty().withMessage("Job Type is required"),
    check("experience").notEmpty().withMessage("Experience is required"),
    check("skills").notEmpty().withMessage("Skills are required"),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.error("Validation errors:", errorMessages);
        return res.status(400).json({ message: errorMessages });
    }
    next();
};

export { validateJobListing, handleValidationErrors }; // export the validation middleware
