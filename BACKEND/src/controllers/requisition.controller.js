import RequisitionService from '../services/requisition.service.js'

async function createRequisition(req, res, next) {
	try {
		const requisition = req.body

		if (!requisition.date)
			res.status(400).json({ error: 'A data é obrigatória!' })

		res.send(await RequisitionService.createRequisition(requisition))
		logger.info(`POST - /requisition - ${JSON.stringify(requisition)}`)
	} catch (error) {
		next(error)
	}
}

async function updateRequisition(req, res, next) {
	try {
		const requisition = req.body

		if (!requisition.requisition_id)
			res.status(400).json({ error: 'O id da requisição é obrigatório!' })

		if (!requisition.date)
			res.status(400).json({ error: 'A data é obrigatória!' })

		res.send(await RequisitionService.updateRequisition(requisition))
		logger.info(`PATCH - /requisition - ${JSON.stringify(requisition)}`)
	} catch (error) {
		next(error)
	}
}

async function getRequisitions(req, res, next) {
	console.log(req.query)
	try {
		res.send(await RequisitionService.getRequisitions(req.query.requisition_id))
		logger.info(`GET - /requisition - all requisitions`)
	} catch (error) {
		next(error)
	}
}

async function getRequisition(req, res, next) {
	try {
		res.send(await RequisitionService.getRequisition(req.params.requisition_id))
		logger.info(`GET - /requisition/:${req.params.requisition_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteRequisition(req, res, next) {
	try {
		res.send(
			await RequisitionService.deleteRequisition(req.params.requisition_id),
		)
		logger.info(`DELETE - /requisition/:${req.params.requisition_id}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createRequisition,
	updateRequisition,
	getRequisitions,
	getRequisition,
	deleteRequisition,
}
