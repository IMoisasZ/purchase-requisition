import CostCenterService from '../services/cost_center.service.js'

async function createCostCenter(req, res, next) {
	try {
		const cost_center = req.body

		if (!cost_center.cost_center)
			res.status(400).json({ error: 'O centro de custos é obrigatório!' })
		if (!cost_center.description)
			res
				.status(400)
				.json({ error: 'A descrição do centro de custos é obrigatória!' })
		if (!cost_center.area_id)
			res
				.status(400)
				.json({ error: 'A area do centro de custos é obrigatório!' })

		res.send(await CostCenterService.createCostCenter(cost_center))
		logger.info(`POST - /cost_center - ${JSON.stringify(cost_center)}`)
	} catch (error) {
		next(error)
	}
}

async function updateCostCenter(req, res, next) {
	try {
		const cost_center = req.body
		console.log(cost_center)

		if (!cost_center.cost_center_id)
			res.status(400).json({ error: 'O ID do centro de custos é obrigatório!' })

		if (!cost_center.cost_center)
			res.status(400).json({ error: 'O centro de custos é obrigatório!' })

		res.send(await CostCenterService.updateCostCenter(cost_center))
		logger.info(
			`PATCH - /cost_center/cost_center - ${JSON.stringify(cost_center)}`
		)
	} catch (error) {
		next(error)
	}
}

async function updateCostCenterData(req, res, next) {
	try {
		const cost_center = req.body

		if (!cost_center.cost_center_id)
			res.status(400).json({ error: 'O ID do centro de custos é obrigatório!' })

		if (!cost_center.description)
			res
				.status(400)
				.json({ error: 'A descrição do centro de custos é obrigatória!' })

		if (!cost_center.area_id)
			res.status(400).json({ error: 'A area é obrigatória!' })

		res.send(await CostCenterService.updateCostCenterData(cost_center))
		logger.info(
			`PATCH - /cost_center/cost_center_data - ${JSON.stringify(cost_center)}`
		)
	} catch (error) {
		next(error)
	}
}

async function getAllCostCenter(req, res, next) {
	try {
		res.send(await CostCenterService.getAllCostCenter())
		logger.info(`GET - /cost_center - all cost center`)
	} catch (error) {
		next(error)
	}
}

async function getCostCenter(req, res, next) {
	try {
		res.send(await CostCenterService.getCostCenter(req.params.cost_center_id))
		logger.info(`GET - /cost_center/:${req.parms.cost_center_id}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createCostCenter,
	updateCostCenter,
	updateCostCenterData,
	getAllCostCenter,
	getCostCenter,
}
