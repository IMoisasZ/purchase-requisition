import express from 'express'
import ProductController from '../controllers/product.controller.js'

const route = express.Router()

route.post('/', ProductController.createProduct)
route.patch('/', ProductController.updateProduct)
route.get('/', ProductController.getProducts)
route.get('/:product_id', ProductController.getProduct)

export default route
