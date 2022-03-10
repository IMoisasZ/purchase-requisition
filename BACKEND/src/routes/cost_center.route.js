import express from 'express'
import CostCenterController from '../controllers/cost_center.controller.js'

const route = express.Router()

route.post('/', CostCenterController.createCostCenter)
route.patch('/cost_center', CostCenterController.updateCostCenter)
route.patch('/cost_center_data', CostCenterController.updateCostCenterData)
route.get('/', CostCenterController.getAllCostCenter)
route.get('/:cost_center_id', CostCenterController.getCostCenter)

export default route
