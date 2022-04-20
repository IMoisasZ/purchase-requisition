import express from 'express'
import UserController from '../controllers/user.controller.js'

const route = express.Router()

route.post('/', UserController.createUser)
route.patch('/', UserController.updateUser)
route.get('/', UserController.getUsers)
route.get('/:user_id', UserController.getUser)
route.put('/', UserController.disableEnable)

export default route
