import productTypeService from '../services/product-type-service.js'

export default {

    async index(req, res) {
        try {
            const search = req.query.s;
            const per_page = parseInt(req.query.per_page) || 30;
            const page = parseInt(req.query.page) || 1;
            const { product_types, total } = await productTypeService.getAllData(page, per_page, search);
            res.json({
                'data': product_types,
                'success': true,
                'meta': {
                    page,
                    per_page,
                    total,
                    total_page: Math.ceil(total / per_page)
                }
            });
        } catch (error) {
            console.error('Error fetching product types:', error);
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
            const product_type = await productTypeService.getData(id);
            if (!product_type) {
                return res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product type'
                });
            }
            res.json({
                'data': product_type,
                'success': true
            });
        } catch (error) {
            console.error('Error fetching product type:', error);
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
            const product_type = await productTypeService.createData({
                name: name
            });
            res.status(201).json({
                'data': product_type,
                'success': true
            });
        } catch (error) {
            console.error('Error storing product type:', error);
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
            const product_type = await productTypeService.updateData({
                name: name
            }, id);
            res.json({
                'data': product_type,
                'success': true
            });
        } catch (error) {
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product type'
                });
            } else {
                res.status(500).json({
                    data: null,
                    success: false,
                    message: 'internal server error'
                });
            }
            console.error('Error updating product type:', error);
        }
    },

    async destroy(req, res) {
        try {
            const id = parseInt(req.params.id);
            const product_type = await productTypeService.deleteData(id);
            res.json({
                'data': product_type,
                'success': true
            });
        } catch (error) {
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found product type'
                });
            } else {
                res.status(500).json({
                    data: null,
                    success: false,
                    message: 'internal server error'
                });
            }
            console.error('Error deleting product type:', error);
        }
    },

}