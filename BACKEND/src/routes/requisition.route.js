import express from 'express'
import RequisitionController from '../controllers/requisition.controller.js'

const route = express.Router()

route.post('/', RequisitionController.createRequisition)
route.patch('/', RequisitionController.updateRequisition)
route.get('/?', RequisitionController.getRequisitions)
route.get('/:requisition_id', RequisitionController.getRequisition)
route.delete('/:requisition_id', RequisitionController.deleteRequisition)

export default route
