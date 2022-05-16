import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'
import SectorModel from './sector.model.js'
import RoleModel from './role.model.js'
import ResponsableModel from './responsable.model.js'

const User = dbConnection.define(
	'user',
	{
		user_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		last_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sector_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		role_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		responsable_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'user' },
)

User.belongsTo(SectorModel, { foreignKey: 'sector_id' })
User.belongsTo(RoleModel, { foreignKey: 'role_id' })
User.associate = (models) => {
	User.hasOne(models.Responsable, { foreignKey: 'user_id', as: 'responsables' })
}

export default User
