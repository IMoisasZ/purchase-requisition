import ResponsableService from '../services/responsable.service.js'

async function createResponsable(req, res, next) {
	try {
		const responsable = req.body
		res.send(await ResponsableService.createResponsable(responsable))
		logger.info(`POST - /responsable - ${JSON.stringify(responsable)}`)
	} catch (error) {
		next(error)
	}
}

async function getResponsables(req, res, next) {
	try {
		res.send(await ResponsableService.getResponsables())
		logger.info(`GET - /responsable - all responsables`)
	} catch (error) {
		next(error)
	}
}

async function getResponsable(req, res, next) {
	try {
		res.send(await ResponsableService.getResponsable(req.params.responsable_id))
		logger.info(`GET - /responsable/:${req.params.responsable_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnable(req, res, next) {
	try {
		const responsable = req.body
		res.send(await ResponsableService.disableEnable(responsable))
		logger.info(`PUT - /responsable - ${JSON.stringify(responsable)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createResponsable,
	getResponsables,
	getResponsable,
	disableEnable,
}
