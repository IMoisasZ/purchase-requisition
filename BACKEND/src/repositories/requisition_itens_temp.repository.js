import RequisitionItensTempModel from '../models/requisition_itens_temp.model.js'
import ProductModel from '../models/product.model.js'
import CostCenterModel from '../models/cost_center.model.js'
import UnityModel from '../models/unity.model.js'

async function createRequisitionItens(requisition_itens) {
	try {
		const newRequisitionItens = await RequisitionItensTempModel.create(
			requisition_itens,
		)
		return await getRequisitionItens(newRequisitionItens.requisition_itens_id)
	} catch (error) {
		throw error
	}
}

async function updateRequisitionItens(requisition_itens) {
	try {
		await RequisitionItensTempModel.update(requisition_itens, {
			where: {
				requisition_itens_id: requisition_itens.requisition_itens_id,
			},
		})
		return await getRequisitionItens(requisition_itens.requisition_itens_id)
	} catch (error) {
		throw error
	}
}

async function getAllRequisitionItens() {
	try {
		return await RequisitionItensTempModel.findAll({
			include: [
				{
					model: ProductModel,
					include: [
						{
							model: UnityModel,
						},
					],
				},
				{
					model: CostCenterModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getRequisitionItens(requisition_itens_id) {
	try {
		return await RequisitionItensTempModel.findByPk(requisition_itens_id, {
			include: [
				{
					model: ProductModel,
					include: [
						{
							model: UnityModel,
						},
					],
				},
				{
					model: CostCenterModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function deleteRequisitionItens(requisition_itens_id) {
	try {
		return await RequisitionItensTempModel.destroy({
			where: {
				requisition_itens_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function truncateRequisitionItensTemp() {
	try {
		return await RequisitionItensTempModel.truncate()
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
	truncateRequisitionItensTemp,
}
