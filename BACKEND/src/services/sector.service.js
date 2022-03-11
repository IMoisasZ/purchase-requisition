import SectorRepository from '../repositories/sector.repository.js'

async function createSector(sector) {
	try {
		sector.sector = sector.sector.toUpperCase()

		return await SectorRepository.createSector(sector)
	} catch (error) {
		throw error
	}
}

async function updateSector(sector) {
	try {
		sector.sector = sector.sector.toUpperCase()

		return await SectorRepository.updateSector(sector)
	} catch (error) {
		throw error
	}
}

async function getSectors() {
	return await SectorRepository.getSectors()
}

async function getSector(sector_id) {
	try {
		const returnedSector = await SectorRepository.getSector(sector_id)

		if (returnedSector === null) {
			throw new Error('Setor inexistente!')
		}

		return returnedSector
	} catch (error) {
		throw error
	}
}

async function disableEnable(sector) {
	return await SectorRepository.disableEnable(sector)
}

export default {
	createSector,
	updateSector,
	getSectors,
	getSector,
	disableEnable,
}
