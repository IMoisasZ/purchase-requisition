import ProductRepository from '../repositories/product.repository.js'
import UnityRepository from '../repositories/unity.repository.js'

async function createProduct(product) {
	try {
		const foundProduct = await ProductRepository.getProductByProduct(
			product.description,
		)
		const foundUnity = await UnityRepository.getUnity(product.unity_id)

		if (foundProduct) {
			throw new Error('Descriçao já cadastrada!')
		}

		if (!foundUnity) {
			throw new Error('Unidade inexistente!')
		}

		product.description = product.description.toUpperCase()

		return await ProductRepository.createProduct(product)
	} catch (error) {
		throw error
	}
}

async function updateProduct(product) {
	try {
		const foundProduct = await ProductRepository.getProductByProduct(
			product.description,
		)
		const foundUnity = await UnityRepository.getUnity(product.unity_id)

		if (foundProduct) {
			throw new Error('Descriçao já cadastrada!')
		}

		if (!foundUnity) {
			throw new Error('Unidade inexistente!')
		}

		product.description = product.description.toUpperCase()

		return await ProductRepository.updateProduct(product)
	} catch (error) {
		throw error
	}
}

async function getProducts() {
	return await ProductRepository.getProducts()
}

async function getProduct(product_id) {
	try {
		const result = await ProductRepository.getProduct(product_id)

		if (result === null) {
			throw new Error('Produto inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

export default {
	createProduct,
	updateProduct,
	getProducts,
	getProduct,
}
