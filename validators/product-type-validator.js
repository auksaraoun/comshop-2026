import { param, body, query, validationResult } from 'express-validator';
import validate from '../utils/validate.js';


export default {
    index: [
        query('page')
            .toInt()
            .optional()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .trim()
            .escape()
            .withMessage('must be integer.'),
        query('per_page')
            .optional()
            .isInt({ min: 1, allow_leading_zeroes: false, max: 100 })
            .trim()
            .escape()
            .withMessage('must be integer.'),
        query('s')
            .optional()
            .isString()
            .trim()
            .escape()
            .isLength({ max: 255 }),
        validate.handleValidateErrors
    ],

    show: [
        param('id')
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .trim()
            .escape()
            .toInt(),
        validate.handleValidateErrors
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
        validate.handleValidateErrors
    ],

    update: [
        param('id')
            .trim()
            .escape()
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
        validate.handleValidateErrors
    ],

    destroy: [
        param('id')
            .notEmpty()
            .trim()
            .escape()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        validate.handleValidateErrors
    ],

}