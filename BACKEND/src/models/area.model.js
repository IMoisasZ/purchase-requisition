import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'
import SectorModel from './sector.model.js'

const Area = dbConnection.define(
	'area',
	{
		area_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		area: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		sector_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'area' },
)

Area.belongsTo(SectorModel, { foreignKey: 'sector_id' })

export default Area
