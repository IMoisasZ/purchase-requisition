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

async function updateCostCenter(newCostCenter, cost_center) {
	if (newCostCenter) {
		try {
			await CostCenterModel.update(
				{ newCostCenter },
				{
					where: {
						cost_center_id: newCostCenter.cost_center_id,
					},
				}
			)
			return await getCostCenter(newCostCenter.cost_center_id)
		} catch (error) {
			throw error
		}
	} else {
		try {
			await CostCenterModel.update(
				{ cost_center },
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

async function disableEnable(cost_center) {
	try {
		await CostCenterModel.update(
			{
				cost_center_id: cost_center.cost_center_id,
				actived: cost_center.actived,
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

export default {
	createCostCenter,
	updateCostCenter,
	getAllCostCenter,
	getCostCenter,
	getCostCenterByCostCenter,
	disableEnable,
}
