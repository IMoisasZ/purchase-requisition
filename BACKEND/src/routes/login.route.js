import express from 'express'
import LoginController from '../controllers/login.controller.js'

const route = express.Router()

route.post('/', LoginController.Login)

export default route
