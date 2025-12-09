import express from 'express'

// validators
import productTypeValidator from '../validators/product-type-validator.js'
import brandValidator from '../validators/brand-validator.js'

// controllers
import prodctTypeController from '../controllers/product-type-controller.js'
import brandController from '../controllers/brand-controller.js'

const router = express.Router()

router.get('/product-types', productTypeValidator.index, prodctTypeController.index)
router.get('/product-types/:id', productTypeValidator.show, prodctTypeController.show)
router.post('/product-types', productTypeValidator.store, prodctTypeController.store)
router.patch('/product-types/:id', productTypeValidator.update, prodctTypeController.update)
router.delete('/product-types/:id', productTypeValidator.destroy, prodctTypeController.destroy)

router.get('/brands', brandValidator.index, brandController.index)
router.get('/brands/:id', brandValidator.show, brandController.show)
router.post('/brands', brandValidator.store, brandController.store)
router.patch('/brands/:id', brandValidator.update, brandController.update)
router.delete('/brands/:id', brandValidator.destroy, brandController.destroy)

export default router