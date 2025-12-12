import express from 'express'

// validators
import productTypeValidator from '../validators/product-type-validator.js'
import brandValidator from '../validators/brand-validator.js'
import productAttrLookupsValidator from '../validators/product-attribute-lookup-validator.js'
import productAttrValueLookupsValidator from '../validators/product-attribute-value-lookup-validator.js'
import productValidator from '../validators/product-validator.js'

// controllers
import prodctTypeController from '../controllers/product-type-controller.js'
import brandController from '../controllers/brand-controller.js'
import productAttrLookupController from '../controllers/product-attribute-lookup-controller.js'
import productAttrValueLookupController from '../controllers/product-attribute-value-lookup-controller.js'
import productController from '../controllers/product-controller.js'

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

router.get('/product-attribute-lookups', productAttrLookupsValidator.index, productAttrLookupController.index)
router.get('/product-attribute-lookups/:id', productAttrLookupsValidator.show, productAttrLookupController.show)
router.post('/product-attribute-lookups', productAttrLookupsValidator.store, productAttrLookupController.store)
router.patch('/product-attribute-lookups/:id', productAttrLookupsValidator.update, productAttrLookupController.update)
router.delete('/product-attribute-lookups/:id', productAttrLookupsValidator.destroy, productAttrLookupController.destroy)

router.get('/product-attribute-value-lookups', productAttrValueLookupsValidator.index, productAttrValueLookupController.index)
router.get('/product-attribute-value-lookups/:id', productAttrValueLookupsValidator.show, productAttrValueLookupController.show)
router.post('/product-attribute-value-lookups', productAttrValueLookupsValidator.store, productAttrValueLookupController.store)
router.patch('/product-attribute-value-lookups/:id', productAttrValueLookupsValidator.update, productAttrValueLookupController.update)
router.delete('/product-attribute-value-lookups/:id', productAttrValueLookupsValidator.destroy, productAttrValueLookupController.destroy)

router.get('/products', productValidator.index, productController.index)
router.get('/products/:id', productValidator.show, productController.show)
router.post('/products', productValidator.store, productController.store)
router.patch('/products/:id', productValidator.update, productController.update)
router.delete('/products/:id', productValidator.destroy, productController.destroy)

export default router