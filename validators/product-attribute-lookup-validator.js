import { param, body, query } from 'express-validator';
import { handleValidateErrors, validProductType } from '../utils/validate.js';


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
        query('product_type_id')
            .toInt()
            .optional()
            .isInt({ min: 1, allow_leading_zeroes: false }),
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
        body('detail')
            .notEmpty()
            .trim()
            .escape()
            .withMessage('is required')
            .isLength({
                min: 1,
                max: 255
            })
            .withMessage('length must be between 1 to 255'),
        body('product_type_id')
            .toInt()
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .custom(validProductType),
        handleValidateErrors
    ],

    update: [
        param('id')
            .trim()
            .escape()
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        body('detail')
            .notEmpty()
            .withMessage('is required')
            .isLength({
                min: 1,
                max: 255
            })
            .withMessage('length must be between 1 to 255'),
        body('product_type_id')
            .toInt()
            .optional()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .custom(validProductType)
            .withMessage('Incorrect Product type ID'),
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