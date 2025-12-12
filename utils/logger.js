import logger from '../libs/logger.js'

export default {
    logError(error, req, location = '') {
        console.log(error);
        logger.log({
            level: 'error',
            location,
            message: error.message,
            stack: error.stack,
            req: {
                path: req.path,
                params: req.params,
                query: req.query,
                body: req.body,
            }
        });
    }
}