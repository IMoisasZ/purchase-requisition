import RequisitionRepository from '../repositories/requisition.repository.js'

async function createRequisition(requisition) {
	try {
		return await RequisitionRepository.createRequisition(requisition)
	} catch (error) {
		throw error
	}
}

async function updateRequisition(requisition) {
	try {
		const foundRequisition = await RequisitionRepository.getRequisition(
			requisition.requisition_id,
		)

		if (!foundRequisition) {
			throw new Error('Requisição inexistente!')
		}

		requisition.status = requisition.status.toUpperCase()

		return await RequisitionRepository.updateRequisition(requisition)
	} catch (error) {
		throw error
	}
}

async function getRequisitions() {
	return await RequisitionRepository.getRequisitions()
}

async function getRequisition(requisition_id) {
	try {
		const result = await RequisitionRepository.getRequisition(requisition_id)

		if (result === null) {
			throw new Error('Requisição inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

async function deleteRequisition(requisition_id) {
	try {
		const result = await RequisitionRepository.deleteRequisition(requisition_id)

		if (result === null) {
			throw new Error('Requisição inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

export default {
	createRequisition,
	updateRequisition,
	getRequisitions,
	getRequisition,
	deleteRequisition,
}
