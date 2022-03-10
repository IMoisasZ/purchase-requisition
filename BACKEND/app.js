import express from 'express'
import winston from 'winston'
import cors from 'cors'
import SectorRoute from './src/routes/sector.route.js'
import RoleRoute from './src/routes/role.route.js'
import UserRoute from './src/routes/user.route.js'
import AreaRoute from './src/routes/area.route.js'
import CostCenterRoute from './src/routes/cost_center.route.js'
import UnityRoute from './src/routes/unity.route.js'
import ProductRoute from './src/routes/product.route.js'
import RequisitionRoute from './src/routes/requisition.route.js'
import RequisitionItensRoute from './src/routes/requisition_itens.route.js'

// app
const app = express()

// json
app.use(express.json())

// cors
app.use(cors())

// routes
app.use('/sector', SectorRoute)
app.use('/role', RoleRoute)
app.use('/user', UserRoute)
app.use('/area', AreaRoute)
app.use('/cost_center', CostCenterRoute)
app.use('/unity', UnityRoute)
app.use('/product', ProductRoute)
app.use('/requisition', RequisitionRoute)
app.use('/requisition_itens', RequisitionItensRoute)

// winston(log)
const { combine, timestamp, label, printf } = winston.format
const myformat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
	level: 'silly',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'purchase-requisitions' }),
	],
	format: combine(
		label({ label: 'purchase-requisitions' }),
		timestamp(),
		myformat,
	),
})

// erro padrão
app.use((err, req, res, next) => {
	global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
	res.status(400).send({ erros: err.message })
})

export default app
