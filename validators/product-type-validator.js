import { param, body, query, validationResult } from 'express-validator';
import validate from '../utils/validate.js';


export default {
    index: [
        query('page')
            .toInt()
            .optional()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer.'),
        query('per_page')
            .optional()
            .isInt({ min: 1, allow_leading_zeroes: false, max: 100 })
            .withMessage('must be integer.'),
        query('s')
            .optional()
            .isString()
            .isLength({ max: 255 }),
        validate.handleValidateErrors
    ],

    show: [
        param('id')
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .toInt(),
        validate.handleValidateErrors
    ],

    store: [
        body('name')
            .notEmpty()
            .withMessage('is required')
            .isLength({
                min: 1,
                max: 255
            })
            .withMessage('length must be between 1 to 255'),
        (req, res, next) => {
            const validate = validationResult(req);
            if (!validate.isEmpty()) {
                return validate.sendResponseMessage(errors, res);
            }
            next();
        }
    ],

    update: [
        param('id')
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        body('name')
            .notEmpty()
            .withMessage('is required')
            .isLength({
                min: 1,
                max: 255
            })
            .withMessage('length must be between 1 to 255'),
        validate.handleValidateErrors
    ],

    destroy: [
        param('id')
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        validate.handleValidateErrors
    ],

}