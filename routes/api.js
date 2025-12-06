import express from 'express'

// validators
import productTypeValidator from '../validators/product-type-validator.js'

// controllers
import prodctTypeController from '../controllers/product-type-controller.js'

const router = express.Router()

router.get('/product-types', productTypeValidator.index, prodctTypeController.index)
router.get('/product-types/:id', productTypeValidator.show, prodctTypeController.show)
router.post('/product-types', productTypeValidator.store, prodctTypeController.store)
router.patch('/product-types/:id', productTypeValidator.update, prodctTypeController.update)
router.delete('/product-types/:id', productTypeValidator.destroy, prodctTypeController.destroy)

export default router