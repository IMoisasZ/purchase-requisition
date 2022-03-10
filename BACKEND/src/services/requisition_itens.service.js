import RequisitionItensRepository from '../repositories/requisition_itens.repository.js'

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
			throw new Error('Reuisição inexistente!')
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

export default {
	createRequisitionItens,
	updateRequisitionItens,
	getAllRequisitionItens,
	getRequisitionItens,
	deleteRequisitionItens,
}
