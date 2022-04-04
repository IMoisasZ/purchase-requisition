import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'
import UnityModel from './unity.model.js'

const Product = dbConnection.define(
	'product',
	{
		product_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		code_dbcorp: {
			type: Sequelize.INTEGER,
			allowNull: true,
			unique: true,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		unity_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'product' },
)

Product.belongsTo(UnityModel, { foreignKey: 'unity_id' })

export default Product
