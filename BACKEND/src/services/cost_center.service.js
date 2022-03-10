import CostCenterRepository from '../repositories/cost_center.repository.js'
import AreaRepository from '../repositories/area.repository.js'

async function createCostCenter(cost_center) {
	try {
		const foundCostCenter =
			await CostCenterRepository.getCostCenterByCostCenter(
				cost_center.cost_center,
			)

		const foundArea = await AreaRepository.getArea(cost_center.area_id)

		if (foundCostCenter) {
			throw new Error('Centro de custos já cadastrado!')
		}

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
		const foundCostCenter =
			await CostCenterRepository.getCostCenterByCostCenter(
				cost_center.cost_center,
			)

		const foundArea = await AreaRepository.getArea(cost_center.area_id)

		if (foundCostCenter) {
			throw new Error('Centro de custos já cadastrado!')
		}

		if (!foundArea) {
			throw new Error('Area inexistente!')
		}

		cost_center.description = cost_center.description.toUpperCase()

		return await CostCenterRepository.updateCostCenter(cost_center)
	} catch (error) {
		throw error
	}
}

async function updateCostCenterData(cost_center) {
	try {
		const foundArea = await AreaRepository.getArea(cost_center.area_id)

		if (!foundArea) {
			throw new Error('Area inexistente!')
		}

		cost_center.description = cost_center.description.toUpperCase()

		return await CostCenterRepository.updateCostCenterData(cost_center)
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

export default {
	createCostCenter,
	updateCostCenter,
	updateCostCenterData,
	getAllCostCenter,
	getCostCenter,
}
