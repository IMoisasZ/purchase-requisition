import express from 'express'
import AreaController from '../controllers/area.controller.js'

const route = express.Router()

route.post('/', AreaController.createArea)
route.patch('/', AreaController.updateArea)
route.get('/', AreaController.getAreas)
route.get('/:area_id', AreaController.getArea)

export default route
