import SectorModel from '../models/sector.model.js'

async function createSector(sector) {
	try {
		const newSector = await SectorModel.create(sector)
		return await getSector(newSector.sector_id)
	} catch (error) {
		throw error
	}
}

async function updateSector(sector) {
	try {
		await SectorModel.update(sector, {
			where: {
				sector_id: sector.sector_id,
			},
		})
		return await getSector(sector.sector_id)
	} catch (error) {
		throw error
	}
}

async function getSectors() {
	try {
		return await SectorModel.findAll()
	} catch (error) {
		throw error
	}
}

async function getSector(sector_id) {
	try {
		return await SectorModel.findByPk(sector_id)
	} catch (error) {
		throw error
	}
}

async function getSectorBySector(sector) {
	try {
		return await SectorModel.findOne({
			where: {
				sector,
			},
		})
	} catch (error) {
		throw error
	}
}

export default {
	createSector,
	updateSector,
	getSectors,
	getSector,
	getSectorBySector,
}
