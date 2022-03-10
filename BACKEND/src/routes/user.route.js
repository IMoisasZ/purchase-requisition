import express from 'express'
import RouteController from '../controllers/user.controller.js'

const route = express.Router()

route.post('/', RouteController.createUser)
route.patch('/user_data', RouteController.updateUser)
route.patch('/user_email', RouteController.updateUserEmail)
route.patch('/user_password', RouteController.updateUserPassword)
route.get('/', RouteController.getUsers)
route.get('/:user_id', RouteController.getUser)

export default route
