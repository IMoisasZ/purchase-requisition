import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'

const Sector = dbConnection.define(
	'sector',
	{
		sector_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		sector: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'sector' },
)

export default Sector
