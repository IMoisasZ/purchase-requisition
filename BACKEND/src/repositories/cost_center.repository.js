import CostCenterModel from '../models/cost_center.model.js'
import AreaModel from '../models/area.model.js'
import SectorModel from '../models/sector.model.js'

async function createCostCenter(cost_center) {
	try {
		const newCostCenter = await CostCenterModel.create(cost_center)
		return await getCostCenter(newCostCenter.cost_center_id)
	} catch (error) {
		throw error
	}
}

async function updateCostCenter(cost_center) {
	try {
		await CostCenterModel.update(
			{
				cost_center: cost_center.cost_center,
			},
			{
				where: {
					cost_center_id: cost_center.cost_center_id,
				},
			}
		)
		return await getCostCenter(cost_center.cost_center_id)
	} catch (error) {
		throw error
	}
}

async function updateCostCenterData(cost_center) {
	try {
		await CostCenterModel.update(
			{
				description: cost_center.description,
				area_id: cost_center.area_id,
			},
			{
				where: {
					cost_center_id: cost_center.cost_center_id,
				},
			}
		)
		return await getCostCenter(cost_center.cost_center_id)
	} catch (error) {
		throw error
	}
}

async function getAllCostCenter() {
	try {
		return await CostCenterModel.findAll({
			include: [
				{
					model: AreaModel,
					include: [
						{
							model: SectorModel,
						},
					],
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getCostCenter(cost_center_id) {
	try {
		return await CostCenterModel.findByPk(cost_center_id, {
			include: [
				{
					model: AreaModel,
					include: [
						{
							model: SectorModel,
						},
					],
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getCostCenterByCostCenter(cost_center) {
	try {
		return await CostCenterModel.findOne({
			where: {
				cost_center,
			},
		})
	} catch (error) {
		throw error
	}
}

export default {
	createCostCenter,
	updateCostCenter,
	updateCostCenterData,
	getAllCostCenter,
	getCostCenter,
	getCostCenterByCostCenter,
}
