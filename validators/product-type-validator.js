import { param, body, query, validationResult } from 'express-validator';
import validate from '../utils/validate.js';


export default {
    index: [
        query('page')
            .trim()
            .toInt()
            .optional()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer.'),
        query('per_page')
            .trim()
            .optional()
            .isInt({ min: 1, allow_leading_zeroes: false, max: 100 })
            .withMessage('must be integer.'),
        query('s')
            .optional()
            .trim()
            .isString()
            .isLength({ max: 255 }),
        validate.handleValidateErrors
    ],

    show: [
        param('id')
            .trim()
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .toInt(),
        validate.handleValidateErrors
    ],

    store: [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('is required')
            .isLength({
                min: 1,
                max: 255
            })
            .withMessage('length must be between 1 to 255'),
        validate.handleValidateErrors
    ],

    update: [
        param('id')
            .trim()
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
            .trim()
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        validate.handleValidateErrors
    ],

}