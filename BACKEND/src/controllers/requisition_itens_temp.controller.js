import RequisitionItensTempService from '../services/requisition_itens_temp.service.js'

async function createRequisitionItens(req, res, next) {
	try {
		const requisition_itens = req.body

		if (!requisition_itens.product_id)
			res.status(400).json({ error: 'O produto é obrigatório!' })
		if (!requisition_itens.quantity)
			res.status(400).json({ error: 'A quantidade é obrigatória!' })
		if (!requisition_itens.cost_center_id)
			res.status(400).json({ error: 'O centro de custos é obrigatório!' })
		if (!requisition_itens.dead_line)
			res.status(400).json({ error: 'O prazo é obrigatório!' })

		res.send(
			await RequisitionItensTempService.createRequisitionItens(
				requisition_itens,
			),
		)

		logger.info(
			`POST - /requisition_itens - ${JSON.stringify(requisition_itens)}`,
		)
	} catch (error) {
		next(error)
	}
}

async function updateRequisitionItens(req, res, next) {
	try {
		const requisition_itens = req.body

		if (!requisition_itens.product_id)
			res.status(400).json({ error: 'O produto é obrigatório!' })
		if (!requisition_itens.quantity)
			res.status(400).json({ error: 'A quantidade é obrigatória!' })
		if (!requisition_itens.cost_center_id)
			res.status(400).json({ error: 'O centro de custos é obrigatório!' })
		if (!requisition_itens.dead_line)
			res.status(400).json({ error: 'O prazo é obrigatório!' })

		res.send(
			await RequisitionItensTempService.updateRequisitionItens(
				requisition_itens,
			),
		)

		logger.info(
			`PATCH - /requisition_itens - ${JSON.stringify(requisition_itens)}`,
		)
	} catch (error) {
		next(error)
	}
}

async function getAllRequisitionItens(req, res, next) {
	try {
		res.send(await RequisitionItensTempService.getAllRequisitionItens())

		logger.info(`GET - /requisition_itens - all itens temp}`)
	} catch (error) {
		next(error)
	}
}

async function getRequisitionItens(req, res, next) {
	try {
		res.send(
			await RequisitionItensTempService.getRequisitionItens(
				req.params.requisition_itens_id,
			),
		)

		logger.info(`GET - /requisition_itens - ${req.params.requisition_itens_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteRequisitionItens(req, res, next) {
	try {
		await RequisitionItensTempService.deleteRequisitionItens(
			req.params.requisition_itens_id,
		)

		res.status(200).json({
			msg: `O item ${req.params.requisition_itens_id} foi removido com sucesso!`,
		})

		logger.info(
			`DELETE - /requisition_itens - ${req.params.requisition_itens_id}`,
		)
	} catch (error) {
		next(error)
	}
}

async function truncateRequisitionItensTemp(req, res, next) {
	try {
		const result =
			await RequisitionItensTempService.truncateRequisitionItensTemp()
		res.status(200).json({ msg: 'Table limpa!' })
		logger.info(`TRUNCATE - /post - truncate table`)
	} catch (error) {
		next(error)
	}
}

export default {
	createRequisitionItens,
	updateRequisitionItens,
	getAllRequisitionItens,
	getRequisitionItens,
	deleteRequisitionItens,
	truncateRequisitionItensTemp,
}
