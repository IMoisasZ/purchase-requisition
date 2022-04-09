import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'
import UnityModel from './unity.model.js'
import CostCenterModel from './cost_center.model.js'
import ProductModel from './product.model.js'

const RequisitionItensTemp = dbConnection.define(
	'requisition_itens_temp',
	{
		requisition_itens_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		requisition_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		unity_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		cost_center_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		product_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		di: {
			type: Sequelize.STRING,
		},
		op: {
			type: Sequelize.STRING,
		},
		comments: {
			type: Sequelize.STRING,
		},
		deadline: {
			type: Sequelize.DATE,
			allowNull: false,
		},
	},
	{ tableName: 'requisition_itens_temp' },
)

RequisitionItens.belongsTo(UnityModel, { foreignKey: 'unity_id' })
RequisitionItens.belongsTo(CostCenterModel, { foreignKey: 'cost_center_id' })
RequisitionItens.belongsTo(ProductModel, { foreignKey: 'product_id' })

export default RequisitionItensTemp
