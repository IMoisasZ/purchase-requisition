import Sequelize from 'sequelize'
import dbConnection from '../connections/db.connection.js'
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
		product_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		cost_center_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		di: {
			type: Sequelize.STRING,
		},
		op: {
			type: Sequelize.STRING,
		},
		dead_line: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		comments: {
			type: Sequelize.STRING,
		},
	},
	{ tableName: 'requisition_itens_temp' },
)

RequisitionItensTemp.belongsTo(CostCenterModel, {
	foreignKey: 'cost_center_id',
})
RequisitionItensTemp.belongsTo(ProductModel, {
	foreignKey: 'product_id',
})

export default RequisitionItensTemp
