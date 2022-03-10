import ProductModel from '../models/product.model.js'
import UnityModel from '../models/unity.model.js'

async function createProduct(product) {
	try {
		const newProduct = await ProductModel.create(product)
		return await getProduct(newProduct.product_id)
	} catch (error) {
		throw error
	}
}

async function updateProduct(product) {
	try {
		await ProductModel.update(product, {
			where: {
				product_id: product.product_id,
			},
		})
		return await getProduct(product.product_id)
	} catch (error) {
		throw error
	}
}

async function getProducts() {
	try {
		return await ProductModel.findAll({
			include: [
				{
					model: UnityModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getProduct(product_id) {
	try {
		return await ProductModel.findByPk(product_id, {
			include: [
				{
					model: UnityModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getProductByProduct(product) {
	try {
		return await ProductModel.findOne({
			where: {
				description: product,
			},
		})
	} catch (error) {
		throw error
	}
}

export default {
	createProduct,
	updateProduct,
	getProducts,
	getProduct,
	getProductByProduct,
}
