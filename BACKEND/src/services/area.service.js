import AreaRepository from '../repositories/area.repository.js'
import SectorRepository from '../repositories/sector.repository.js'

async function createArea(area) {
	try {
		const foundArea = await AreaRepository.getAreaByArea(area.area)
		const foundSector = await SectorRepository.getSector(area.sector_id)

		if (foundArea) {
			throw new Error('Area já cadastrada!')
		}

		if (!foundSector) {
			throw new Error('Setor inexistente!')
		}

		area.area = area.area.toUpperCase()

		return await AreaRepository.createArea(area)
	} catch (error) {
		throw error
	}
}

async function updateArea(area) {
	try {
		const foundArea = await AreaRepository.getAreaByArea(area.area)
		const foundSector = await SectorRepository.getSector(area.sector_id)

		if (foundArea) {
			throw new Error('Area já cadastrada!')
		}

		if (!foundSector) {
			throw new Error('Setor inexistente!')
		}

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

export default {
	createArea,
	updateArea,
	getAreas,
	getArea,
}
