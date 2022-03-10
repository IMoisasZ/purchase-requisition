import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'

const Unity = dbConnection.define(
	'unity',
	{
		unity_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		unity_tag: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'unity' }
)

export default Unity
