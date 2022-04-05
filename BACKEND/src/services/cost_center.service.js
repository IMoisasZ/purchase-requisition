import CostCenterRepository from '../repositories/cost_center.repository.js'
import AreaRepository from '../repositories/area.repository.js'
import RequisitionItensRepository from '../repositories/requisition_itens.repository.js'

async function createCostCenter(cost_center) {
	try {
		const foundArea = await AreaRepository.getArea(cost_center.area_id)

		if (!foundArea) {
			throw new Error('Area inexistente!')
		}

		cost_center.description = cost_center.description.toUpperCase()

		return await CostCenterRepository.createCostCenter(cost_center)
	} catch (error) {
		throw error
	}
}

async function updateCostCenter(cost_center) {
	try {
		const foundArea = await AreaRepository.getArea(cost_center.area_id)

		if (foundArea === null) {
			throw new Error('Area inexistente!')
		}

		const foundCostCenterRequisition =
			await RequisitionItensRepository.getRequisitionByCostCenter(
				cost_center.cost_center_id
			)

		if (foundCostCenterRequisition) {
			const newCostCenter = {
				cost_center_id: cost_center.cost_center_id,
				description: cost_center.description.toUpperCase(),
				area_id: cost_center.area_id,
				actived: cost_center.actived,
			}
			console.log(newCostCenter)
			return await CostCenterRepository.updateCostCenter(newCostCenter)
		} else {
			cost_center.description = cost_center.description.toUpperCase()
			return await CostCenterRepository.updateCostCenter(cost_center)
		}
	} catch (error) {
		throw error
	}
}

async function getAllCostCenter() {
	return await CostCenterRepository.getAllCostCenter()
}

async function getCostCenter(cost_center_id) {
	try {
		const result = await CostCenterRepository.getCostCenter(cost_center_id)

		if (result === null) {
			throw new Error('Centro de custos inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

async function disableEnable(cost_center) {
	try {
		const result = await CostCenterRepository.getCostCenter(
			cost_center.cost_center_id
		)

		if (result === null) {
			throw new Error('Centro de custos inexistente!')
		}

		return await CostCenterRepository.disableEnable(cost_center)
	} catch (error) {
		throw error
	}
}

export default {
	createCostCenter,
	updateCostCenter,
	getAllCostCenter,
	getCostCenter,
	disableEnable,
}
