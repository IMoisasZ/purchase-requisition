import Sequelize from 'sequelize'
import DbConnection from '../connections/db.connection.js'

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
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'responsable' }
)

// Responsable.associate = (models) => {
// 	Responsable.hasMany(models.User, { foreignKey: 'user_id', as: 'users' })
// }
export default Responsable
