import { param, body, query } from 'express-validator';
import { handleValidateErrors } from '../utils/validate.js';


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
            .trim()
            .escape()
            .isLength({ max: 255 }),
        handleValidateErrors
    ],

    show: [
        param('id')
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .toInt(),
        handleValidateErrors
    ],

    store: [
        body('name')
            .notEmpty()
            .trim()
            .escape()
            .withMessage('is required')
            .isLength({
                min: 1,
                max: 255
            })
            .withMessage('length must be between 1 to 255'),
        handleValidateErrors
    ],

    update: [
        param('id')
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        body('name')
            .notEmpty()
            .trim()
            .escape()
            .withMessage('is required')
            .isLength({
                min: 1,
                max: 255
            })
            .withMessage('length must be between 1 to 255'),
        handleValidateErrors
    ],

    destroy: [
        param('id')
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        handleValidateErrors
    ],

}