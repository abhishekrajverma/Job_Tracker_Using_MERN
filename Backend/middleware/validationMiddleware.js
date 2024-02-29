// Used to validate user input
import { validationResult, check } from 'express-validator';

const validateUserCreation = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        console.error('Validation errors:', errorMessages);
        return res.status(400).json({ message: errorMessages });
        
    }
    next();
};

// Used to validate user login

export { validateUserCreation, handleValidationErrors };
