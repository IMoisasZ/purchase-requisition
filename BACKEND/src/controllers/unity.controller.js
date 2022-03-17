import UnityService from '../services/unity.service.js'

async function createUnity(req, res, next) {
	try {
		const unity = req.body
		console.log(unity)
		if (!unity.unity_tag) {
			res.status(400).json({ error: 'A unidade é obrigatória!' })
		}
		if (!unity.description) {
			res.status(400).json({ error: 'A descrição é obrigatória!' })
		}

		res.send(await UnityService.createUnity(unity))
		logger.info(`POST - /unity - ${JSON.stringify(unity)}`)
	} catch (error) {
		next(error)
	}
}

async function updateUnity(req, res, next) {
	try {
		const unity = req.body

		if (!unity.unity_id) {
			res.status(400).json({ error: 'O ID da unidade é obrigatória!' })
		}
		if (!unity.unity_tag) {
			res.status(400).json({ error: 'A unidade é obrigatória!' })
		}
		if (!unity.description) {
			res.status(400).json({ error: 'A descrição é obrigatória!' })
		}

		res.send(await UnityService.updateUnity(unity))
		logger.info(`PATCH - /unity - ${JSON.stringify(unity)}`)
	} catch (error) {
		next(error)
	}
}

async function getUnits(req, res, next) {
	try {
		res.send(await UnityService.getUnits())
		logger.info(`GET - /unity - all units`)
	} catch (error) {
		next(error)
	}
}

async function getUnity(req, res, next) {
	try {
		res.send(await UnityService.getUnity(req.params.unity_id))
		logger.info(`GET - /unity/:${req.params.unity_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnable(req, res, next) {
	try {
		const unity = req.body

		res.send(await UnityService.disableEnable(unity))
		logger.info(`PUT - /unity - ${JSON.stringify(unity)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createUnity,
	updateUnity,
	getUnits,
	getUnity,
	disableEnable,
}
