import AreaRepository from '../repositories/area.repository.js'
import SectorRepository from '../repositories/sector.repository.js'

async function createArea(area) {
	try {
		area.area = area.area.toUpperCase()

		return await AreaRepository.createArea(area)
	} catch (error) {
		throw error
	}
}

async function updateArea(area) {
	try {
		area.area = area.area.toUpperCase()

		return await AreaRepository.updateArea(area)
	} catch (error) {
		throw error
	}
}

async function getAreas() {
	return await AreaRepository.getAreas()
}

async function getArea(area_id) {
	const result = await AreaRepository.getArea(area_id)

	if (result === null) {
		throw new Error('Area inexistente!')
	}

	return result
}

async function disableEnable(area) {
	return await AreaRepository.disableEnable(area)
}

export default {
	createArea,
	updateArea,
	getAreas,
	getArea,
	disableEnable,
}
