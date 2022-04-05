import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'
import AreaModel from './area.model.js'

const CostCenter = dbConnection.define(
	'cost_center',
	{
		cost_center_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		cost_center: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		area_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'cost_center' },
)

CostCenter.belongsTo(AreaModel, { foreignKey: 'area_id' })

export default CostCenter
