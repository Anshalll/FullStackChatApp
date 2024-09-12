import ValidationError from "../utils/ValidationError.js";

export const ErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        
        return res.status(400).json({ error: 'An error occured!' });
    }
    next(err);
}



