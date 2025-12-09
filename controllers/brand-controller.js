import brandService from '../services/brand-service.js'
import logger from '../utils/logger.js'

export default {

    async index(req, res) {
        try {
            const search = req.query.s;
            const per_page = parseInt(req.query.per_page) || 30;
            const page = parseInt(req.query.page) || 1;
            const { brands, total } = await brandService.getAllData(page, per_page, search);
            res.json({
                'data': brands,
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
            const brands = await brandService.getData(id);
            if (!brands) {
                return res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found brands'
                });
            }
            res.json({
                'data': brands,
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
            const brands = await brandService.createData({
                name: name
            });
            res.status(201).json({
                'data': brands,
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
            const brands = await brandService.updateData({
                name: name
            }, id);
            res.json({
                'data': brands,
                'success': true
            });
        } catch (error) {
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found brands'
                });
            } else {
                logger.logError(error, req);
                res.status(500).json({
                    data: null,
                    success: false,
                    message: 'internal server error'
                });
            }
            console.error('Error updating brands:', error);
        }
    },

    async destroy(req, res) {
        try {
            const id = parseInt(req.params.id);
            const brands = await brandService.deleteData(id);
            res.json({
                'data': brands,
                'success': true
            });
        } catch (error) {
            if (error.code = "P2025") {
                res.status(404).json({
                    data: null,
                    success: false,
                    message: 'Not found brands'
                });
            } else {
                logger.logError(error, req);
                res.status(500).json({
                    data: null,
                    success: false,
                    message: 'internal server error'
                });
            }
            console.error('Error deleting brands:', error);
        }
    },

}