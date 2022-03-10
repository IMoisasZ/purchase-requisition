import express from 'express'
import RequisitionItensController from '../controllers/requisition_itens.controller.js'

const route = express.Router()

route.post('/', RequisitionItensController.createRequisitionItens)
route.patch('/', RequisitionItensController.updateRequisitionItens)
route.get(
	'/requisition/:requisition_id',
	RequisitionItensController.getAllRequisitionItens,
)
route.get(
	'/:requisition_itens_id',
	RequisitionItensController.getRequisitionItens,
)
route.delete(
	'/:requisition_itens_id',
	RequisitionItensController.deleteRequisitionItens,
)

export default route
