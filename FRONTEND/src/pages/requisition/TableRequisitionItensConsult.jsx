import React from 'react'
import style from './TableRequisitionItensConsult.module.css'

function TableRequisitionItensConsult({ itens }) {
	return (
		<div className={style.container}>
			<div className={style.div_table_itens}>
				<table>
					<caption>Itens Requisição</caption>
					<thead>
						<tr>
							<th>#</th>
							<th>Produto</th>
							<th>Quantidade</th>
							<th>Centro de Custos</th>
							<th>DI</th>
							<th>OP</th>
						</tr>
					</thead>
					<tbody>
						{itens.map((it, index) => {
							return (
								<tr key={it.requisition_itens_id}>
									<td>{index + 1}</td>
									<td>{it.product.description}</td>
									<td>{it.quantity}</td>
									<td>{it.cost_center.description}</td>
									<td>{it.di}</td>
									<td>{it.op}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default TableRequisitionItensConsult
