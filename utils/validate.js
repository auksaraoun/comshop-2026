import { validationResult } from 'express-validator';

export default {
    handleValidateErrors(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = validate.errors.reduce((msgs, error) => {
                msgs.push(`${error.path} ${error.msg}`);
                return msgs;
            }, []);
            return res.status(400).json({
                success: false,
                messages: messages
            });
        }
        next();
    }
}