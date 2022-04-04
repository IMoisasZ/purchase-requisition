import ProductService from '../services/product.service.js'

async function createProduct(req, res, next) {
	try {
		const product = req.body

		if (!product.description)
			res.status(400).json({ error: 'A descrição é obrigatória!' })
		if (!product.unity_id)
			res.status(400).json({ error: 'A unidade é obrigatória!' })

		res.send(await ProductService.createProduct(product))
		logger.info(`POST - /product - ${JSON.stringify(product)}`)
	} catch (error) {
		next(error)
	}
}

async function updateProduct(req, res, next) {
	try {
		const product = req.body

		if (!product.description)
			res.status(400).json({ error: 'A descrição é obrigatória!' })
		if (!product.unity_id)
			res.status(400).json({ error: 'A unidade é obrigatória!' })

		res.send(await ProductService.updateProduct(product))
		logger.info(`PATCH - /product - ${JSON.stringify(product)}`)
	} catch (error) {
		next(error)
	}
}

async function getProducts(req, res, next) {
	try {
		res.send(await ProductService.getProducts())
		logger.info(`GET - /product - all products`)
	} catch (error) {
		next(error)
	}
}

async function getProduct(req, res, next) {
	try {
		res.send(await ProductService.getProduct(req.params.product_id))
		logger.info(`GET - /product/:${req.params.product_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnable(req, res, next) {
	try {
		const product = req.body
		res.send(await ProductService.disableEnable(product))
		logger.info(`PUT - /product - ${JSON.stringify(product)}`)
	} catch (error) {
		next(error)
	}
}

async function deleteProduct(req, res, next) {
	try {
		res.send(await ProductService.deleteProduct(req.params.product_id))
		logger.info(`DELTE - /delete/:${req.params.product_id}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createProduct,
	updateProduct,
	getProducts,
	getProduct,
	disableEnable,
	deleteProduct,
}
