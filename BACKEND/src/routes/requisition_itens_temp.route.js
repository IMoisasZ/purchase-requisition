import express from 'express'
import RequisitionItensTempController from '../controllers/requisition_itens_temp.controller.js'

const route = express.Router()

route.post('/', RequisitionItensTempController.createRequisitionItens)
route.patch('/', RequisitionItensTempController.updateRequisitionItens)
route.get('/requisition', RequisitionItensTempController.getAllRequisitionItens)
route.get(
	'/:requisition_itens_id',
	RequisitionItensTempController.getRequisitionItens,
)
route.delete(
	'/:requisition_itens_id',
	RequisitionItensTempController.deleteRequisitionItens,
)
route.delete(
	'/truncate/table',
	RequisitionItensTempController.truncateRequisitionItensTemp,
)
export default route
