import { param, body, query } from 'express-validator';
import { handleValidateErrors, validProductType, validBrand, validStoreProductAttr, validUpdateProductAttr } from '../utils/validate.js';


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
        query('brand_id')
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
        body('product_type_id')
            .toInt()
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer')
            .custom(validProductType),
        body('brand_id')
            .toInt()
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer')
            .custom(validBrand),
        body('product_attributes')
            .optional()
            .isArray()
            .custom(validStoreProductAttr),
        body('product_attributes.*.product_attribute_lookup_id')
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        body('product_attributes.*.product_attribute_value')
            .escape(),
        body('product_attributes.*.qty')
            .isInt({ allow_leading_zeroes: false })
            .withMessage('must be integer'),
        handleValidateErrors
    ],

    update: [
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
        body('product_type_id')
            .toInt()
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer')
            .custom(validProductType),
        body('brand_id')
            .toInt()
            .notEmpty()
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer')
            .custom(validBrand),
        body('product_attributes')
            .optional()
            .isObject()
            .custom(validUpdateProductAttr),
        body('product_attributes.upsert')
            .optional()
            .isArray(),
        body('product_attributes.upsert.*.product_attribute_lookup_id')
            .isInt({ min: 1, allow_leading_zeroes: false })
            .withMessage('must be integer'),
        body('product_attributes.upsert.*.product_attribute_value')
            .escape(),
        body('product_attributes.upsert.*.qty')
            .isInt({ allow_leading_zeroes: false })
            .withMessage('must be integer'),
        body('product_attributes.delete')
            .optional()
            .isArray(),
        body('product_attributes.delete.*')
            .isInt({ allow_leading_zeroes: false })
            .withMessage('must be integer')
            .toInt(),
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