import express from 'express'
import userController from '../controllers/user.controller.js'
import RouteController from '../controllers/user.controller.js'

const route = express.Router()

route.post('/', RouteController.createUser)
route.patch('/', RouteController.updateUser)
route.get('/', RouteController.getUsers)
route.get('/:user_id', RouteController.getUser)
route.put('/', userController.disableEnable)

export default route
