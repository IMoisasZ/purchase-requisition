import RequisitionItensTempRepository from '../repositories/requisition_itens_temp.repository.js'

async function createRequisitionItens(requisition_itens) {
	return await RequisitionItensTempRepository.createRequisitionItens(
		requisition_itens,
	)
}

async function updateRequisitionItens(requisition_itens) {
	return await RequisitionItensTempRepository.updateRequisitionItens(
		requisition_itens,
	)
}

async function getAllRequisitionItens() {
	try {
		const result = await RequisitionItensTempRepository.getAllRequisitionItens()

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
		const result = await RequisitionItensTempRepository.getRequisitionItens(
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
		const result = await RequisitionItensTempRepository.deleteRequisitionItens(
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

async function truncateRequisitionItensTemp() {
	return await RequisitionItensTempRepository.truncateRequisitionItensTemp()
}

export default {
	createRequisitionItens,
	updateRequisitionItens,
	getAllRequisitionItens,
	getRequisitionItens,
	deleteRequisitionItens,
	truncateRequisitionItensTemp,
}
