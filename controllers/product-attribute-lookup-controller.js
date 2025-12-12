import productAttrService from '../services/product-attribute-lookup-service.js'
import logger from '../utils/logger.js'

export default {

    async index(req, res) {
        try {
            const search = req.query.s;
            const per_page = parseInt(req.query.per_page) || 30;
            const page = parseInt(req.query.page) || 1;
            const product_type_id = parseInt(req.query.product_type_id) || null;
            const { product_attrs, total } = await productAttrService.getAllData(page, per_page, search, product_type_id);
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
            const product_attrs = await productAttrService.getData(id);
            if (!product_attrs) {
                return res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product_attrs'
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
            const detail = req.body.detail;
            const product_type_id = parseInt(req.body.product_type_id) || null;
            const product_attrs = await productAttrService.createData({
                detail: detail,
                product_type_id: product_type_id
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
            const detail = req.body.detail;
            const product_type_id = parseInt(req.body.product_type_id) || null;
            const product_attrs = await productAttrService.updateData({
                detail: detail,
                product_type_id: product_type_id
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
                    message: 'Not found product_attrs'
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
            const product_attrs = await productAttrService.deleteData(id);
            res.json({
                'data': product_attrs,
                'success': true
            });
        } catch (error) {
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product_attrs'
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