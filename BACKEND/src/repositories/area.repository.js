import AreaModel from '../models/area.model.js'
import SectorModel from '../models/sector.model.js'

async function createArea(area) {
	try {
		const newArea = await AreaModel.create(area)
		return await getArea(newArea.area_id)
	} catch (error) {
		throw error
	}
}

async function updateArea(area) {
	try {
		await AreaModel.update(area, {
			where: {
				area_id: area.area_id,
			},
		})
		return await getArea(area.area_id)
	} catch (error) {
		throw error
	}
}

async function getAreas() {
	try {
		return await AreaModel.findAll()
	} catch (error) {
		throw error
	}
}

async function getArea(area_id) {
	try {
		return await AreaModel.findByPk(area_id, {
			include: [
				{
					model: SectorModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getAreaByArea(area) {
	try {
		return await AreaModel.findOne({
			where: {
				area,
			},
		})
	} catch (error) {
		throw error
	}
}

export default {
	createArea,
	updateArea,
	getAreas,
	getArea,
	getAreaByArea,
}
