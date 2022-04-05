import express from 'express'
import CostCenterController from '../controllers/cost_center.controller.js'

const route = express.Router()

route.post('/', CostCenterController.createCostCenter)
route.patch('/', CostCenterController.updateCostCenter)
route.get('/', CostCenterController.getAllCostCenter)
route.get('/:cost_center_id', CostCenterController.getCostCenter)
route.put('/', CostCenterController.disableEnable)

export default route
