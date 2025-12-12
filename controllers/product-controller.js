import productService from '../services/product-service.js'
import logger from '../utils/logger.js'

export default {

    async index(req, res) {
        try {
            const search = req.query.s;
            const per_page = parseInt(req.query.per_page) || 30;
            const page = parseInt(req.query.page) || 1;
            const product_type_id = parseInt(req.query.product_type_id) || null;
            const brand_id = parseInt(req.query.brand_id) || null;
            const { products, total } = await productService.getAllData(page, per_page, search, product_type_id, brand_id);
            res.json({
                'data': products,
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
            const product = await productService.getData(id);
            if (!product) {
                return res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product'
                });
            }
            res.json({
                'data': product,
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
            const name = req.body.name;
            const product_type_id = parseInt(req.body.product_type_id);
            const brand_id = parseInt(req.body.brand_id);
            let product_attributes = req.body.product_attributes;
            product_attributes = product_attributes.map((product_attribute) => {
                product_attribute.product_attribute_lookup_id = parseInt(product_attribute.product_attribute_lookup_id);
                product_attribute.product_attribute_value = product_attribute.product_attribute_value + '';
                return product_attribute;
            });
            const products = await productService.createData({
                name: name,
                product_type_id: product_type_id,
                brand_id: brand_id,
                product_attributes: {
                    create: product_attributes
                }
            });
            res.status(201).json({
                'data': products,
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
            const name = req.body.name;
            const product_type_id = parseInt(req.body.product_type_id);
            const brand_id = parseInt(req.body.brand_id);
            let toUpdate = [];
            let toCreate = [];
            let toDelete = [];

            if (req.body.product_attributes && req.body.product_attributes.upsert) {
                req.body.product_attributes.upsert.forEach(product_attribute => {
                    product_attribute.product_attribute_lookup_id = parseInt(product_attribute.product_attribute_lookup_id);
                    product_attribute.product_attribute_value = product_attribute.product_attribute_value + '';
                    if (product_attribute.id) {
                        toUpdate.push({
                            where: { id: product_attribute.id },
                            data: {
                                product_attribute_lookup_id: product_attribute.product_attribute_lookup_id,
                                product_attribute_value: product_attribute.product_attribute_value,
                                qty: product_attribute.qty,
                            }
                        });
                    } else {
                        toCreate.push(product_attribute);
                    }
                });
            }

            if (req.body.product_attributes && req.body.product_attributes.delete) {
                toDelete = req.body.product_attributes.delete;
            }

            const products = await productService.updateData({
                name: name,
                product_type_id: product_type_id,
                brand_id: brand_id,
                product_attributes: {
                    create: toCreate,
                    update: toUpdate,
                    deleteMany: { id: { in: toDelete } }
                }
            }, id);
            res.status(201).json({
                'data': products,
                'success': true
            });
        } catch (error) {
            logger.logError(error, req);
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found products'
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
            const products = await productService.deleteData(id);
            res.json({
                'data': products,
                'success': true
            });
        } catch (error) {
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found products'
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