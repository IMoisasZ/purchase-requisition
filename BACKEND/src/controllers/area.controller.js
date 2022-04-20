import AreaService from '../services/area.service.js'

async function createArea(req, res, next) {
	try {
		const area = req.body

		if (!area.area) res.status(400).json({ error: 'A area é obrigatória!' })
		if (!area.sector_id)
			res.status(400).json({ error: 'O setor da area é obrigatório!' })

		res.send(await AreaService.createArea(area))
		logger.info(`POST - /area - ${JSON.stringify(area)}`)
	} catch (error) {
		next(error)
	}
}

async function updateArea(req, res, next) {
	try {
		const area = req.body

		if (!area.area_id)
			res.status(400).json({ error: 'O id da area é obrigatório!' })
		if (!area.area) res.status(400).json({ error: 'A area é obrigatória!' })
		if (!area.sector_id)
			res.status(400).json({ error: 'O setor da area é obrigatório!' })

		res.send(await AreaService.updateArea(area))
		logger.info(`PATCH - /area - ${JSON.stringify(area)}`)
	} catch (error) {
		next(error)
	}
}

async function getAreas(req, res, next) {
	try {
		res.send(await AreaService.getAreas())
		logger.info(`GET - /area - all areas`)
	} catch (error) {
		next(error)
	}
}

async function getArea(req, res, next) {
	try {
		res.send(await AreaService.getArea(req.params.area_id))
		logger.info(`GET - /area/:${req.params.area_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnable(req, res, next) {
	try {
		const area = req.body

		res.send(await AreaService.disableEnable(area))
		logger.info(`PUT /area - ${JSON.stringify(area)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createArea,
	updateArea,
	getAreas,
	getArea,
	disableEnable,
}
