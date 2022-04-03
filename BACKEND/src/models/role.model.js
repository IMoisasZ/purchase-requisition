import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'

const Role = dbConnection.define(
	'role',
	{
		role_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		role: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'role' },
)

export default Role
