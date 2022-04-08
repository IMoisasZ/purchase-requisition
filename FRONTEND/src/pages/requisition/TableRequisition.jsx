import React from 'react'
import api from '../../api/api'
import style from './TableRequisition.module.css'

function TableRequisition({ dataTable }) {
	console.log(dataTable)
	return (
		<div className={style.container}>
			<table>
				<thead>
					<th>Produto</th>
					<th>Qtde</th>
					<th>CC</th>
					<th>DI</th>
					<th>OP</th>
				</thead>
				<tbody>
					{dataTable.map((data, index) => {
						return (
							<tr key={index}>
								<td>{data.product_id}</td>
								<td>{data.quantity}</td>
								<td>{data.cost_center_id}</td>
								<td>{data.di}</td>
								<td>{data.op}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default TableRequisition
