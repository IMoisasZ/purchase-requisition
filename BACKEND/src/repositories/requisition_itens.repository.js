import RequisitionItensModel from '../models/requisition_itens.model.js'

async function createRequisitionItens(requisition_itens) {
	try {
		const newRequisitionItens = await RequisitionItensModel.create(
			requisition_itens,
		)
		return await getRequisitionItens(newRequisitionItens.requisition_itens_id)
	} catch (error) {
		throw error
	}
}

async function updateRequisitionItens(requisition_itens) {
	try {
		await RequisitionItensModel.update(requisition_itens, {
			where: {
				requisition_itens_id: requisition_itens.requisition_itens_id,
			},
		})
		return await getRequisitionItens(requisition_itens.requisition_itens_id)
	} catch (error) {
		throw error
	}
}

async function getAllRequisitionItens(requisition_id) {
	try {
		return await RequisitionItensModel.findAll({
			where: {
				requisition_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function getRequisitionItens(requisition_itens_id) {
	try {
		return await RequisitionItensModel.findByPk(requisition_itens_id)
	} catch (error) {
		throw error
	}
}

async function deleteRequisitionItens(requisition_itens_id) {
	try {
		return await RequisitionItensModel.destroy({
			where: {
				requisition_itens_id,
			},
		})
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
