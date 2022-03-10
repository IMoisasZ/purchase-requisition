import Sequelize from 'sequelize'
import dbConnetion from '../connections/db.connection.js'
import UserModel from './user.model.js'

const Requisition = dbConnetion.define(
	'requisition',
	{
		requisition_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		comments: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ tableName: 'requisition' }
)

Requisition.belongsTo(UserModel, { foreignKey: 'user_id' })

export default Requisition
