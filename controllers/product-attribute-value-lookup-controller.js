import productAttrValueService from '../services/product-attribute-value-lookup-service.js'
import logger from '../utils/logger.js'

export default {

    async index(req, res) {
        try {
            const search = req.query.s;
            const per_page = parseInt(req.query.per_page) || 30;
            const page = parseInt(req.query.page) || 1;
            const product_attribute_lookup_id = parseInt(req.query.product_attribute_lookup_id) || null;
            const { product_attrs, total } = await productAttrValueService.getAllData(page, per_page, search, product_attribute_lookup_id);
            res.json({
                'data': product_attrs,
                'success': true,
                'meta': {
                    page,
                    per_page,
                    total,
                    total_page: Math.ceil(total / per_page)
                }
            });
        } catch (error) {
            logger.logError(error, req);
            res.status(500).json({
                data: null,
                success: false,
                message: 'internal server error'
            });
        }
    },

    async show(req, res) {
        try {
            const id = parseInt(req.params.id);
            const product_attrs = await productAttrValueService.getData(id);
            if (!product_attrs) {
                return res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product_attrs_value'
                });
            }
            res.json({
                'data': product_attrs,
                'success': true
            });
        } catch (error) {
            logger.logError(error, req);
            res.status(500).json({
                data: null,
                success: false,
                message: 'internal server error'
            });
        }
    },

    async store(req, res) {
        try {
            const value = req.body.value;
            const product_attribute_lookup_id = parseInt(req.body.product_attribute_lookup_id) || null;
            const product_attrs = await productAttrValueService.createData({
                value: value,
                product_attribute_lookup_id: product_attribute_lookup_id
            });
            res.status(201).json({
                'data': product_attrs,
                'success': true
            });
        } catch (error) {
            logger.logError(error, req);
            res.status(500).json({
                data: null,
                success: false,
                message: 'internal server error'
            });
        }
    },

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const value = req.body.value;
            const product_attribute_lookup_id = parseInt(req.body.product_attribute_lookup_id) || null;
            const product_attrs = await productAttrValueService.updateData({
                value: value,
                product_attribute_lookup_id: product_attribute_lookup_id
            }, id);
            res.json({
                'data': product_attrs,
                'success': true
            });
        } catch (error) {
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product_attrs_value'
                });
            } else {
                logger.logError(error, req);
                res.status(500).json({
                    data: null,
                    success: false,
                    message: 'internal server error'
                });
            }
        }
    },

    async destroy(req, res) {
        try {
            const id = parseInt(req.params.id);
            const product_attrs = await productAttrValueService.deleteData(id);
            res.json({
                'data': product_attrs,
                'success': true
            });
        } catch (error) {
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product_attrs_value'
                });
            } else {
                logger.logError(error, req);
                res.status(500).json({
                    data: null,
                    success: false,
                    message: 'internal server error'
                });
            }

        }
    },

}