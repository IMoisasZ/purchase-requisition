import Sequelize, { BelongsTo } from 'sequelize'
import DbConnection from '../connections/db.connection.js'
import UserModel from './user.model.js'

const Responsable = DbConnection.define(
	'responsable',
	{
		responsable_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'responsable' }
)
Responsable.belongsTo(UserModel, { foreignKey: 'user_id' })
export default Responsable
