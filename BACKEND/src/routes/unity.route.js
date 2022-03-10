import express from 'express'
import UnityController from '../controllers/unity.controller.js'

const route = express.Router()

route.post('/', UnityController.createUnity)
route.patch('/', UnityController.updateUnity)
route.get('/', UnityController.getUnits)
route.get('/:unity_id', UnityController.getUnity)

export default route
