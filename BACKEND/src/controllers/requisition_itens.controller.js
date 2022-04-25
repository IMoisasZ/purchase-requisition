import RequisitionItensService from '../services/requisition_itens.service.js'

async function createRequisitionItens(req, res, next) {
	try {
		const requisition_itens = req.body
		console.log(requisition_itens)
		if (!requisition_itens.requisition_id)
			res.status(400).json({ error: 'A requisição é obrigatória!' })
		if (!requisition_itens.product_id)
			res.status(400).json({ error: 'O produto é obrigatório!' })
		if (!requisition_itens.quantity)
			res.status(400).json({ error: 'A quantidade é obrigatória!' })
		if (!requisition_itens.cost_center_id)
			res.status(400).json({ error: 'O centro de custos é obrigatório!' })
		if (!requisition_itens.dead_line)
			res.status(400).json({ error: 'O prazo é obrigatório!' })

		res.send(
			await RequisitionItensService.createRequisitionItens(requisition_itens),
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

		if (!requisition_itens.requisition_itens_id)
			res
				.status(400)
				.json({ error: 'O id do item da requisição é obrigatório!' })
		if (!requisition_itens.requisition_id)
			res.status(400).json({ error: 'A requisição é obrigatória!' })
		if (!requisition_itens.product_id)
			res.status(400).json({ error: 'O produto é obrigatório!' })
		if (!requisition_itens.quantity)
			res.status(400).json({ error: 'A quantidade é obrigatória!' })
		if (!requisition_itens.cost_center_id)
			res.status(400).json({ error: 'O centro de custos é obrigatório!' })
		if (!requisition_itens.dead_line)
			res.status(400).json({ error: 'O prazo é obrigatório!' })

		res.send(
			await RequisitionItensService.updateRequisitionItens(requisition_itens),
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
		res.send(
			await RequisitionItensService.getAllRequisitionItens(
				req.params.requisition_id,
			),
		)

		logger.info(`GET - /requisition_itens - ${req.params.requisition_id}`)
	} catch (error) {
		next(error)
	}
}

async function getRequisitionItens(req, res, next) {
	try {
		res.send(
			await RequisitionItensService.getRequisitionItens(
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
		await RequisitionItensService.deleteRequisitionItens(
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

async function getRequisitionByProduct(req, res, next) {
	try {
		res.send(
			await RequisitionItensService.getRequisitionByProduct(
				req.params.product_id,
			),
		)
		logger.info(`GET /product-requisition/${req.params.product_id}`)
	} catch (error) {
		next(error)
	}
}

async function createRequisitionExcel(req, res, next) {
	res.send(
		RequisitionItensService.createRequisitionExcel(req.params.requisition_id),
	)
	logger.info(`POST /requisition/excel/${req.params.requisition_id}`)
}

async function createRequisitionPdf(req, res, next) {
	res.send(
		RequisitionItensService.createRequisitionPdf(req.params.requisition_id),
	)

	logger.info(`POST /requisition/pdf/${req.params.requisition_id}`)
}

export default {
	createRequisitionItens,
	updateRequisitionItens,
	getAllRequisitionItens,
	getRequisitionItens,
	deleteRequisitionItens,
	getRequisitionByProduct,
	createRequisitionExcel,
	createRequisitionPdf,
}
