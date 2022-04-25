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
route.get(
	'/product-requisition/:product_id',
	RequisitionItensController.getRequisitionByProduct,
)
route.post(
	'/requisition/pdf/download/:requisition_id',
	RequisitionItensController.createRequisitionPdf,
)
route.post(
	'/requisition/excel/:requisition_id',
	RequisitionItensController.createRequisitionExcel,
)

export default route
