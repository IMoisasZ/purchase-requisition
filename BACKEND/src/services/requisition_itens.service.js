import RequisitionItensRepository from '../repositories/requisition_itens.repository.js'
import ProductRepository from '../repositories/product.repository.js'
import excel from '../utils/requisition_excel.js'

async function createRequisitionItens(requisition_itens) {
	return await RequisitionItensRepository.createRequisitionItens(
		requisition_itens,
	)
}

async function updateRequisitionItens(requisition_itens) {
	return await RequisitionItensRepository.updateRequisitionItens(
		requisition_itens,
	)
}

async function getAllRequisitionItens(requisition_id) {
	try {
		const result = await RequisitionItensRepository.getAllRequisitionItens(
			requisition_id,
		)

		if (result === null) {
			throw new Error('Requisição inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

async function getRequisitionItens(requisition_itens_id) {
	try {
		const result = await RequisitionItensRepository.getRequisitionItens(
			requisition_itens_id,
		)

		if (result === null) {
			throw new Error('Id item inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

async function deleteRequisitionItens(requisition_itens_id) {
	try {
		const result = await RequisitionItensRepository.deleteRequisitionItens(
			requisition_itens_id,
		)

		if (result === 0) {
			throw new Error('Id item inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

async function getRequisitionByProduct(product_id) {
	try {
		const result = await ProductRepository.getProduct(product_id)

		if (!result) {
			throw new Error('Produto inesistente!')
		}

		const product = await RequisitionItensRepository.getRequisitionByProduct(
			product_id,
		)

		return product ? true : false
	} catch (error) {
		throw error
	}
}

async function createRequisitionExcel(requisition_id) {
	try {
		const requisition = await RequisitionItensRepository.getAllRequisitionItens(
			requisition_id,
		)

		if (!requisition) {
			throw new Error('Requisição inexistente!')
		}

		const newExcel = excel(requisition)
		return newExcel
	} catch (error) {
		throw error
	}
}

export default {
	createRequisitionItens,
	updateRequisitionItens,
	getAllRequisitionItens,
	getRequisitionItens,
	deleteRequisitionItens,
	getRequisitionByProduct,
	createRequisitionExcel,
}
