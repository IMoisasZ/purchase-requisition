import express from 'express'
import ResponsableController from '../controllers/responsable.controller.js'

const route = express.Router()

route.post('/', ResponsableController.createResponsable)
route.get('/', ResponsableController.getResponsables)
route.get('/:responsable_id', ResponsableController.getResponsable)
route.put('/', ResponsableController.disableEnable)

export default route
