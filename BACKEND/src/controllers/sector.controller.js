import SectorService from '../services/sector.service.js'

async function createSector(req, res, next) {
	try {
		const sector = req.body

		if (!sector.sector) {
			res.status(400).json({ erro: 'Nome do setor é obrigatório!' })
		}

		res.send(await SectorService.createSector(sector))

		logger.info(`POST - /sector - ${JSON.stringify(sector)}`)
	} catch (error) {
		next(error)
	}
}

async function updateSector(req, res, next) {
	try {
		const sector = req.body

		if (!sector.sector) {
			res.status(400).json({ erro: 'Nome do setor é obrigatório!' })
		}

		res.send(await SectorService.updateSector(sector))

		logger.info(`PACTH - /sector - ${JSON.stringify(sector)}`)
	} catch (error) {
		next(error)
	}
}

async function getSectors(req, res, next) {
	try {
		res.send(await SectorService.getSectors())

		logger.info(`GET - /sector - show all sector`)
	} catch (error) {
		next(error)
	}
}

async function getSector(req, res, next) {
	try {
		res.send(await SectorService.getSector(req.params.sector_id))

		logger.info(`GET - /sector/:${req.params.sector_id}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createSector,
	updateSector,
	getSectors,
	getSector,
}
