import ProductRepository from '../repositories/product.repository.js'
import UnityRepository from '../repositories/unity.repository.js'

async function createProduct(product) {
	try {
		const foundUnity = await UnityRepository.getUnity(product.unity_id)

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
		const foundUnity = await UnityRepository.getUnity(product.unity_id)

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

async function disableEnable(product) {
	try {
		const result = await ProductRepository.getProduct(product.product_id)

		if (!result) {
			throw new Error(`Produto inexistente!`)
		}

		return await ProductRepository.disableEnable(product)
	} catch (error) {
		throw error
	}
}

async function deleteProduct(product_id) {
	try {
		const result = await ProductRepository.getProduct(product_id)
		console.log(result)
		if (result === null) {
			throw new Error(`Produto inexistente!`)
		}

		return await ProductRepository.deleteProduct(product_id)
	} catch (error) {
		throw error
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
