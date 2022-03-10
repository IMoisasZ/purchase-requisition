import RequisitionModel from '../models/requisition.model.js'

async function createRequisition(requisition) {
	try {
		const newRequisition = await RequisitionModel.create(requisition)
		return await getRequisition(newRequisition.requisition_id)
	} catch (error) {
		throw error
	}
}

async function updateRequisition(requisition) {
	try {
		await RequisitionModel.update(requisition, {
			where: {
				requisition_id: requisition.requisition_id,
			},
		})
		return await getRequisition(requisition.requisition_id)
	} catch (error) {
		throw error
	}
}

async function getRequisitions() {
	try {
		return await RequisitionModel.findAll()
	} catch (error) {
		throw error
	}
}

async function getRequisition(requisition_id) {
	try {
		return await RequisitionModel.findByPk(requisition_id)
	} catch (error) {
		throw error
	}
}

async function deleteRequisition(requisition_id) {
	try {
		await RequisitionModel.destroy({
			where: {
				requisition_id,
			},
		})
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
