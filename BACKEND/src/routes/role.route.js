import express from 'express'
import RoleController from '../controllers/role.controller.js'

const route = express.Router()

route.post('/', RoleController.createRole)
route.patch('/', RoleController.updateRole)
route.get('/', RoleController.getRoles)
route.get('/:role_id', RoleController.getRole)

export default route
